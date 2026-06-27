import { openapi } from '@/lib/openapi';

/**
 * Renders an OpenAPI spec as one Markdown document, one section per
 * operation. Mirrors the HTML reference page so content-parity checks
 * pass.
 */

const HTTP_METHODS = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'] as const;

function jsonExampleBlock(value: unknown): string[] {
  return ['```json', JSON.stringify(value, null, 2), '```'];
}

function describeSchema(
  schema: unknown,
  components: Record<string, unknown> = {},
  depth = 0,
): string[] {
  if (schema === undefined || schema === null) return ['_No schema_'];
  const s = schema as Record<string, unknown>;

  if (typeof s.$ref === 'string') {
    const refName = s.$ref.replace(/^#\/components\/schemas\//, '');
    const resolved = components[refName] as Record<string, unknown> | undefined;
    if (!resolved) return [`_(schema: ${refName})_`];
    return describeSchema(resolved, components, depth);
  }

  const lines: string[] = [];

  if (typeof s.description === 'string') {
    lines.push(s.description, '');
  }

  if (s.enum && Array.isArray(s.enum)) {
    const type = typeof s.type === 'string' ? s.type : 'value';
    lines.push(`**Type:** \`${type}\``);
    lines.push(
      `**Allowed:** ${(s.enum as unknown[]).map((v) => `\`${JSON.stringify(v)}\``).join(', ')}`,
    );
    if (typeof s.default !== 'undefined') {
      lines.push(`**Default:** \`${JSON.stringify(s.default)}\``);
    }
    return lines;
  }

  if (s.type === 'object' || (s.properties && typeof s.properties === 'object')) {
    const props = (s.properties ?? {}) as Record<string, Record<string, unknown>>;
    const required = new Set(Array.isArray(s.required) ? (s.required as string[]) : []);
    lines.push('**Type:** `object`');
    if (required.size > 0) {
      lines.push(`**Required:** ${[...required].map((r) => `\`${r}\``).join(', ')}`);
    }
    lines.push('', '**Fields:**', '');
    for (const [name, prop] of Object.entries(props)) {
      const req = required.has(name) ? ' _(required)_' : '';
      const type = typeof prop.type === 'string' ? prop.type : prop.$ref ? 'object' : 'any';
      lines.push(`- \`${name}\`${req} — \`${type}\``);
      if (typeof prop.description === 'string') {
        lines.push(`  ${prop.description}`);
      }
      if (Array.isArray(prop.enum)) {
        lines.push(
          `  Allowed: ${prop.enum.map((v: unknown) => `\`${JSON.stringify(v)}\``).join(', ')}`,
        );
      }
      if (prop.type === 'array' && prop.items && typeof prop.items === 'object') {
        const items = prop.items as Record<string, unknown>;
        const itemType =
          typeof items.type === 'string' ? items.type : items.$ref ? 'object' : 'any';
        lines.push(`  Items: \`${itemType}\``);
        if (typeof items.description === 'string') {
          lines.push(`  ${items.description}`);
        }
      }
    }
    return lines;
  }

  if (s.type === 'array') {
    lines.push('**Type:** `array`');
    if (s.items && typeof s.items === 'object') {
      lines.push(...describeSchema(s.items, components, depth + 1).map((l) => `  ${l}`));
    }
    return lines;
  }

  const type = typeof s.type === 'string' ? s.type : 'any';
  lines.push(`**Type:** \`${type}\``);
  if (typeof s.format === 'string') lines.push(`**Format:** \`${s.format}\``);
  if (typeof s.default !== 'undefined') {
    lines.push(`**Default:** \`${JSON.stringify(s.default)}\``);
  }
  if (Array.isArray(s.oneOf)) {
    lines.push('**One of:**');
    for (const variant of s.oneOf as unknown[]) {
      lines.push(...describeSchema(variant, components, depth + 1).map((l) => `  ${l}`));
    }
  }
  return lines;
}

function renderOperation(
  pathKey: string,
  method: string,
  op: Record<string, unknown>,
  components: Record<string, unknown>,
): string[] {
  const lines: string[] = [];
  const summary = typeof op.summary === 'string' ? op.summary : pathKey;
  lines.push(`### \`${method.toUpperCase()} ${pathKey}\` — ${summary}`, '');

  if (typeof op.description === 'string' && op.description.trim()) {
    lines.push(op.description.trim(), '');
  }

  const tags = Array.isArray(op.tags) ? (op.tags as string[]) : [];
  if (tags.length > 0) {
    lines.push(`**Tags:** ${tags.map((t) => `\`${t}\``).join(', ')}`, '');
  }

  if (op.parameters && Array.isArray(op.parameters)) {
    lines.push('**Parameters:**', '');
    for (const param of op.parameters as Record<string, unknown>[]) {
      const name = typeof param.name === 'string' ? param.name : '?';
      const inLoc = typeof param.in === 'string' ? ` (${param.in})` : '';
      const required = param.required ? ' _(required)_' : '';
      const schema = param.schema as Record<string, unknown> | undefined;
      const type = schema && typeof schema.type === 'string' ? schema.type : 'any';
      lines.push(`- \`${name}\`${inLoc}${required} — \`${type}\``);
      if (typeof param.description === 'string') {
        lines.push(`  ${param.description}`);
      }
    }
    lines.push('');
  }

  const requestBody = op.requestBody as Record<string, unknown> | undefined;
  if (requestBody?.content) {
    const content = requestBody.content as Record<string, Record<string, unknown>>;
    for (const [mediaType, mediaObj] of Object.entries(content)) {
      lines.push(`**Request Body** (\`${mediaType}\`):`, '');
      if (mediaObj.schema) {
        lines.push(...describeSchema(mediaObj.schema, components));
      }
      if (mediaObj.example !== undefined) {
        lines.push('', '**Example:**', ...jsonExampleBlock(mediaObj.example));
      }
      lines.push('');
    }
  }

  const responses = op.responses as Record<string, Record<string, unknown>> | undefined;
  if (responses) {
    lines.push('**Responses:**', '');
    for (const [status, resp] of Object.entries(responses)) {
      const desc = typeof resp.description === 'string' ? resp.description : '';
      lines.push(`- **\`${status}\`** — ${desc}`);
      if (resp.content && typeof resp.content === 'object') {
        for (const [mediaType, mediaObj] of Object.entries(
          resp.content as Record<string, Record<string, unknown>>,
        )) {
          lines.push(`  - \`${mediaType}\``);
          if (mediaObj.schema) {
            lines.push(...describeSchema(mediaObj.schema, components).map((l) => `    ${l}`));
          }
          if (mediaObj.example !== undefined) {
            lines.push('  - Example:');
            lines.push(...jsonExampleBlock(mediaObj.example).map((l) => `    ${l}`));
          }
        }
      }
    }
    lines.push('');
  }

  return lines;
}

export async function renderOpenApiAsMarkdown(
  specPath: string,
  title: string,
  specSlug: string,
): Promise<string> {
  const { dereferenced } = await openapi.getSchema(specPath);
  const components = (dereferenced.components?.schemas ?? {}) as Record<string, unknown>;
  const baseUrl = 'https://thisonedev.github.io';

  const lines: string[] = [
    '> For the complete documentation index, see [llms.txt](/llms.txt). A full-text snapshot is also available at [llms-full.txt](/llms-full.txt).',
    '',
    `# ${title} (/portfolio/api/${specSlug})`,
    '',
    `Full reference: ${baseUrl}/portfolio/api/${specSlug}/`,
    '',
    '## Operations',
    '',
  ];

  const paths = (dereferenced.paths ?? {}) as Record<string, Record<string, unknown>>;
  for (const [pathKey, pathItem] of Object.entries(paths)) {
    for (const method of HTTP_METHODS) {
      const op = pathItem[method];
      if (!op) continue;
      lines.push(...renderOperation(pathKey, method, op as Record<string, unknown>, components));
      lines.push('---', '');
    }
  }

  return lines.join('\n');
}
