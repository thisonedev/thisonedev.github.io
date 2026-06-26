'use client';

import { cva } from 'class-variance-authority';
import { ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import {
  type ComponentProps,
  Fragment,
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '@/lib/cn';
import OpenAPIImg from '../../content/images/api-ref.png';
import AppRefImg from '../../content/images/app-ref.png';
import GuideImg from '../../content/images/guide-ref.png';
import SdkRefImg from '../../content/images/sdk-ref.png';

const GrainGradient = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.GrainGradient),
  { ssr: false },
);

const Dithering = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.Dithering),
  { ssr: false },
);

// ─── Hero ────────────────────────────────────────────────────────────────────

export function Hero() {
  const { resolvedTheme } = useTheme();
  const ref = useRef<HTMLImageElement | null>(null);
  const visible = useIsVisible(ref);
  const [showShaders, setShowShaders] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowShaders(true);
    }, 400);
  }, []);

  return (
    <>
      {showShaders && (
        <GrainGradient
          className="absolute inset-0 animate-fd-fade-in duration-800"
          colors={
            resolvedTheme === 'dark'
              ? ['#1a3d2b', '#0d2e1e', '#2a3a1e00']
              : ['#d4e8d0', '#a8c5a0', '#e8ead800']
          }
          colorBack="#00000000"
          softness={1}
          intensity={0.9}
          noise={0.5}
          speed={visible ? 1 : 0}
          shape="corners"
          minPixelRatio={1}
          maxPixelCount={1920 * 1080}
        />
      )}
      {showShaders && (
        <Dithering
          width={720}
          height={420}
          colorBack="#00000000"
          colorFront={resolvedTheme === 'dark' ? '#8aad78' : '#6b8f5e'}
          shape="sphere"
          type="4x4"
          scale={0.7}
          size={3}
          speed={0}
          frame={5000 * 120}
          className="absolute animate-fd-fade-in duration-400 max-lg:bottom-[-65%] max-lg:left-[-120px] lg:top-[-5%] lg:right-0"
          minPixelRatio={1}
        />
      )}
    </>
  );
}

// ─── PreviewImages ────────────────────────────────────────────────────────────

const previewButtonVariants = cva('w-24 h-8 text-sm font-medium transition-colors rounded-full', {
  variants: {
    active: {
      true: 'text-fd-primary-foreground',
      false: 'text-fd-muted-foreground',
    },
  },
});

export function PreviewImages(props: ComponentProps<'div'>) {
  const [active, setActive] = useState(0);

  const previews = [
    {
      image: OpenAPIImg,
      name: 'REST API',
    },
    {
      image: SdkRefImg,
      name: 'SDK Ref',
    },
    {
      image: GuideImg,
      name: 'Tutorials',
    },
    {
      image: AppRefImg,
      name: 'Apps',
    },
  ];

  return (
    <div {...props} className={cn('relative grid', props.className)}>
      <div className="absolute flex flex-row left-1/2 -translate-1/2 bottom-0 z-2 p-0.5 rounded-full bg-fd-card border shadow-xl">
        <div
          role="none"
          className="absolute bg-fd-primary rounded-full w-24 h-8 transition-transform z-[-1]"
          style={{
            transform: `translateX(calc(var(--spacing) * 24 * ${active}))`,
          }}
        />
        {previews.map((item, i) => (
          <button
            key={item.name}
            type="button"
            className={cn(previewButtonVariants({ active: active === i }))}
            onClick={() => setActive(i)}
          >
            {item.name}
          </button>
        ))}
      </div>
      {previews.map((item, i) => (
        <Image
          key={item.name}
          src={item.image}
          alt="preview"
          className={cn(
            'col-start-1 row-start-1 select-none',
            active === i ? 'animate-in fade-in slide-in-from-bottom-12 duration-800' : 'invisible',
          )}
        />
      ))}
    </div>
  );
}

// ─── Writing / Expertise Tabs ─────────────────────────────────────────────────

const ExpertiseTabs = [
  { name: 'API Refs', value: 'writer' },
  { name: 'CLIs & Apps', value: 'developer' },
  { name: 'Guides', value: 'automation' },
] as const;

export function Writing({
  tabs: tabContents,
}: {
  tabs: Record<(typeof ExpertiseTabs)[number]['value'], ReactNode>;
}) {
  const [tab, setTab] = useState<(typeof ExpertiseTabs)[number]['value']>('writer');

  return (
    <div className="col-span-full my-20">
      <h2 className="text-4xl text-brand mb-8 text-center font-medium tracking-tight">
        What I write
      </h2>
      <p className="text-center mb-8 mx-auto w-full max-w-[800px]">
        From low-level API references to end-to-end integration tutorials with real, runnable code
        at every step.
      </p>
      <div className="flex justify-center items-center gap-4 text-fd-muted-foreground mb-6">
        {ExpertiseTabs.map((item) => (
          <Fragment key={item.value}>
            <ArrowRight className="size-4 first:hidden" />
            <button
              type="button"
              className={cn(
                'text-lg font-medium transition-colors',
                item.value === tab && 'text-brand',
              )}
              onClick={() => setTab(item.value)}
            >
              {item.name}
            </button>
          </Fragment>
        ))}
      </div>
      {Object.entries(tabContents).map(([key, value]) => (
        <div
          key={key}
          aria-hidden={key !== tab}
          className={cn('animate-fd-fade-in', key !== tab && 'hidden')}
        >
          {value}
        </div>
      ))}
    </div>
  );
}

// ─── Process Strip ────────────────────────────────────────────────────────────

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discovery',
    description: 'Audit existing docs, interview engineers, identify gaps and priorities.',
  },
  {
    number: '02',
    title: 'Research',
    description: 'Run the APIs, read the contracts, build a test app. Learn before writing.',
  },
  {
    number: '03',
    title: 'Draft',
    description: 'Write in Markdown, commit to Git, open a PR. Docs treated like code.',
  },
  {
    number: '04',
    title: 'Review',
    description: 'Technical review with engineers, clarity review with non-expert readers.',
  },
  {
    number: '05',
    title: 'Publish',
    description: 'Ship through CI, add to changelog, schedule follow-up review cycle.',
  },
];

export function ProcessStrip() {
  return (
    <div className="rounded-2xl border bg-fd-card shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-medium tracking-tight text-brand mb-8 text-center">
        How I work
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-5">
        {PROCESS_STEPS.map((step, i) => (
          <div key={step.number} className="flex flex-col">
            {/* Connector line — hidden on the last item */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono text-brand font-bold">{step.number}</span>
              {i < PROCESS_STEPS.length - 1 && (
                <div className="hidden sm:block flex-1 h-px bg-brand/20" />
              )}
            </div>
            <h3 className="font-semibold mb-1 text-sm">{step.title}</h3>
            <p className="text-xs text-fd-muted-foreground leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── AgnosticBackground ───────────────────────────────────────────────────────

export function AgnosticBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIsVisible(ref);

  return (
    <div
      ref={ref}
      className="absolute inset-0 -z-1 mask-[linear-gradient(to_top,white_30%,transparent_calc(100%-120px))]"
    >
      <Dithering
        colorBack="#00000000"
        colorFront="#7a9e6e" /* muted sage — natural complement to teal-green primary */
        shape="warp"
        type="4x4"
        speed={visible ? 0.4 : 0}
        className="size-full"
        minPixelRatio={1}
      />
    </div>
  );
}

// ─── Shared utility: IntersectionObserver hook ────────────────────────────────

let observer: IntersectionObserver;
const observerTargets = new WeakMap<Element, (entry: IntersectionObserverEntry) => void>();

function useIsVisible(ref: RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    observer ??= new IntersectionObserver((entries) => {
      for (const entry of entries) {
        observerTargets.get(entry.target)?.(entry);
      }
    });

    const element = ref.current;
    if (!element) return;
    observerTargets.set(element, (entry) => {
      setVisible(entry.isIntersecting);
    });
    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observerTargets.delete(element);
    };
  }, [ref]);

  return visible;
}
