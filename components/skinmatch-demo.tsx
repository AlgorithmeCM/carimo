'use client';

import {useMemo, useRef, useState, type ReactNode} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import {usePathname, useRouter} from 'next/navigation';
import {
  ArrowLeft, ArrowRight, Camera, Check, ChevronDown, CircleCheck, Droplets,
  Crown, ExternalLink, Globe2, Heart, LoaderCircle, LockKeyhole, ScanFace,
  ShieldCheck, ShoppingBag, Sparkles, SunMedium, WandSparkles, X
} from 'lucide-react';
import {ProductVisual} from './product-visual';
import {recommend, type Answers} from '@/lib/recommendations';
import type {Product} from '@/lib/products';

const locales = ['en', 'ar', 'fr'] as const;
type Locale = typeof locales[number];
type Stage = 'landing' | 'consent' | 'capture' | 'questions' | 'analyzing' | 'results';

const defaultAnswers: Answers = {
  feel: 'dry',
  shine: 'rarely',
  sensitivity: 'sometimes',
  concern: 'tone',
  climate: 'air-conditioned',
  texture: 'lightweight',
  routine: 'complete'
};

function Logo() {
  return (
    <div className="flex items-center gap-3 text-start">
      <div className="flex h-12 w-12 items-center justify-center border border-[#d8bd72] bg-[#0d0d0d] text-[#d8bd72] shadow-sm">
        <Crown className="h-7 w-7" strokeWidth={1.55} />
      </div>
      <div className="leading-none">
        <div className="font-display text-[1.35rem] font-bold tracking-[.16em] text-[#0d0d0d]">CARIMO</div>
        <div className="mt-1 text-[8px] font-semibold uppercase tracking-[.25em] text-[#77716a]">L’audace d’être soi</div>
        <div className="mt-1 text-[9px] font-extrabold uppercase tracking-[.18em] text-[#d1007f]">SkinMatch AI</div>
      </div>
    </div>
  );
}

function LanguageSelector() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function switchLocale(next: Locale) {
    const segments = pathname.split('/');
    segments[1] = next;
    localStorage.setItem('carimo_locale', next);
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; samesite=lax`;
    router.replace(segments.join('/') || `/${next}`);
    setOpen(false);
  }

  const names: Record<Locale, string> = {en: 'English', ar: 'العربية', fr: 'Français'};

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="glass flex items-center gap-2 rounded-none border border-[#d9d1c4] px-3 py-2 text-sm font-semibold text-[#3e3a34] shadow-sm" aria-expanded={open}>
        <Globe2 className="h-4 w-4" />
        <span>{names[locale]}</span>
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {open && (
        <div className="absolute end-0 z-50 mt-2 min-w-36 overflow-hidden border border-[#d9d1c4] bg-white p-1 shadow-xl">
          {locales.map((item) => (
            <button key={item} onClick={() => switchLocale(item)} className={`flex w-full items-center justify-between px-3 py-2 text-sm ${item === locale ? 'bg-[#f6f0e5] font-bold text-[#111111]' : 'hover:bg-stone-50'}`}>
              {names[item]} {item === locale && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Header({reset}: {reset: () => void}) {
  const t = useTranslations('common');
  const locale = useLocale() as Locale;
  const shopLabel: Record<Locale, string> = {en: 'Shop', ar: 'المتجر', fr: 'Boutique'};

  return (
    <>
      <div className="border-b border-[#2c2c2c] bg-[#0d0d0d] px-5 py-2 text-center text-[10px] font-semibold uppercase tracking-[.22em] text-[#d8bd72]">
        CARIMO EMPIRE · L’audace d’être soi
      </div>
      <header className="sticky top-0 z-40 border-b border-[#ece6db] bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <button onClick={reset} aria-label="CARIMO SkinMatch home"><Logo /></button>
          <div className="flex items-center gap-2 md:gap-3">
            <span className="hidden border-s-2 border-[#d1007f] px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-[#5f5a53] lg:block">{t('demoBadge')}</span>
            <a href="https://www.carimoempire.com/shop/" target="_blank" rel="noreferrer" className="hidden border border-[#0d0d0d] bg-[#0d0d0d] px-4 py-2.5 text-xs font-bold uppercase tracking-[.1em] text-white transition hover:border-[#d1007f] hover:bg-[#d1007f] sm:block">
              {shopLabel[locale]}
            </a>
            <LanguageSelector />
          </div>
        </div>
      </header>
    </>
  );
}

function Progress({stage}: {stage: Stage}) {
  const stages: Stage[] = ['consent', 'capture', 'questions', 'analyzing', 'results'];
  if (stage === 'landing') return null;
  const index = stages.indexOf(stage);
  return (
    <div className="mx-auto mb-5 flex w-full max-w-3xl gap-2 px-5">
      {stages.map((item, i) => <div key={item} className={`h-1.5 flex-1 rounded-full transition ${i <= index ? 'bg-[#111111]' : 'bg-[#e7e0d4]'}`} />)}
    </div>
  );
}

function Landing({start, skipPhoto}: {start: () => void; skipPhoto: () => void}) {
  const t = useTranslations('landing');
  return (
    <main className="mx-auto grid min-h-[calc(100vh-144px)] w-full max-w-7xl items-center gap-10 px-5 pb-16 pt-10 md:grid-cols-[1.02fr_.98fr] md:px-8 md:pb-20 md:pt-14">
      <section className="relative z-10">
        <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[.18em] text-[#9a761f]">
          <span className="h-px w-10 bg-[#c9a64e]" />
          <WandSparkles className="h-4 w-4" /> {t('eyebrow')}
        </div>
        <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[1.03] text-[#0d0d0d] md:text-7xl">
          {t.rich('title', {highlight: (chunks) => <span className="text-[#d1007f]">{chunks}</span>})}
        </h1>
        <div className="mt-5 h-px w-28 bg-gradient-to-r from-[#c9a64e] to-transparent" />
        <p className="mt-6 max-w-xl text-lg leading-8 text-[#666159] md:text-xl">{t('subtitle')}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button onClick={start} className="group flex items-center justify-center gap-2 bg-[#d1007f] px-7 py-4 font-bold uppercase tracking-[.06em] text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#a90067]">
            <ScanFace className="h-5 w-5" /> {t('primary')}
            <ArrowRight className="rtl-flip h-4 w-4 transition group-hover:translate-x-1" />
          </button>
          <button onClick={skipPhoto} className="flex items-center justify-center gap-2 border border-[#0d0d0d] bg-white px-7 py-4 font-bold uppercase tracking-[.04em] text-[#0d0d0d] transition hover:bg-[#0d0d0d] hover:text-white">
            {t('secondary')}
          </button>
        </div>
        <div className="mt-8 grid max-w-xl gap-3 border-y border-[#e7e0d4] py-5 text-sm text-[#625d56] sm:grid-cols-3">
          <span className="flex items-center gap-2"><LockKeyhole className="h-4 w-4 text-[#d1007f]" /> {t('private')}</span>
          <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#d1007f]" /> {t('nonMedical')}</span>
          <span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-[#c9a64e]" /> {t('minutes')}</span>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-xl">
        <div className="absolute -inset-5 border border-[#c9a64e]/30" />
        <div className="relative border border-[#2a2a2a] bg-[#0d0d0d] p-3 shadow-luxury md:p-5">
          <div className="relative min-h-[560px] overflow-hidden border border-[#c9a64e]/45 bg-[#111111] p-5 text-white">
            <div className="absolute inset-0 mesh opacity-30" />
            <div className="absolute inset-x-0 top-0 h-1 bg-[#d1007f]" />
            <div className="relative flex items-center justify-between border-b border-white/[.15] pb-4">
              <span className="text-xs font-bold uppercase tracking-[.18em] text-[#d8bd72]">{t('livePreview')}</span>
              <Heart className="h-5 w-5 text-[#d1007f]" />
            </div>
            <div className="relative mx-auto mt-8 h-64 w-48 overflow-hidden rounded-[7rem_7rem_2rem_2rem] border border-[#c9a64e]/60 bg-gradient-to-b from-[#d9ad93] to-[#8f5c52] shadow-2xl">
              <div className="absolute left-1/2 top-9 h-44 w-36 -translate-x-1/2 rounded-[48%] bg-[#b9806f]" />
              <div className="absolute left-11 top-[94px] h-3 w-7 rounded-full bg-[#4d2a27]" />
              <div className="absolute right-11 top-[94px] h-3 w-7 rounded-full bg-[#4d2a27]" />
              <div className="absolute left-1/2 top-[126px] h-10 w-5 -translate-x-1/2 rounded-full border-b border-[#76483f]" />
              <div className="absolute left-1/2 top-[161px] h-3 w-14 -translate-x-1/2 rounded-full bg-[#8e4c55]" />
              <div className="scan-line absolute left-4 right-4 top-1/2 h-[2px] bg-[#d1007f] shadow-[0_0_18px_4px_rgba(209,0,127,.7)]" />
            </div>
            <div className="relative mt-6 grid grid-cols-3 gap-px overflow-hidden border border-white/[.15] bg-white/[.15]">
              {[[t('hydration'), '78%'], [t('shine'), 'Low'], [t('match'), '82%']].map(([label, value]) => (
                <div key={label} className="bg-[#161616] p-3 text-center">
                  <div className="font-display text-xl font-bold text-[#d8bd72]">{value}</div><div className="mt-1 text-[9px] uppercase tracking-[.14em] text-white/60">{label}</div>
                </div>
              ))}
            </div>
            <div className="relative mt-4 border border-[#d8bd72]/45 bg-white p-3 text-[#0d0d0d]">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://www.carimoempire.com/wp-content/uploads/2024/05/24k-gamme-4-352x440.png" alt="" className="h-16 w-16 bg-[#f6f3ec] object-contain" />
                <div className="min-w-0 flex-1"><div className="text-[10px] font-bold uppercase tracking-[.12em] text-[#9a761f]">{t('personalMatch')}</div><div className="mt-1 truncate font-display text-lg font-bold">CARIMO Complete Routine</div></div>
                <CircleCheck className="h-6 w-6 text-[#d1007f]" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-5 -start-4 border border-[#c9a64e] bg-white px-4 py-3 shadow-lg">
          <div className="flex items-center gap-2 text-sm font-bold text-[#171717]"><Globe2 className="h-4 w-4 text-[#d1007f]" /> {t('threeLanguages')}</div>
        </div>
      </section>
    </main>
  );
}

function Consent({next, back}: {next: () => void; back: () => void}) {
  const t = useTranslations('consent');
  const [checks, setChecks] = useState([false, false, false]);
  const all = checks.every(Boolean);
  return (
    <StageShell title={t('title')} subtitle={t('subtitle')} icon={<ShieldCheck className="h-6 w-6" />}>
      <div className="space-y-3">
        {[t('temporary'), t('nonDiagnostic'), t('recommendations')].map((label, i) => (
          <button key={label} onClick={() => setChecks((old) => old.map((v, index) => index === i ? !v : v))} className="flex w-full items-start gap-3 rounded-2xl border border-[#e7e0d4] bg-white p-4 text-start transition hover:border-[#c9a64e]">
            <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border ${checks[i] ? 'border-[#111111] bg-[#111111] text-white' : 'border-[#cfc5b6]'}`}>{checks[i] && <Check className="h-4 w-4" />}</span>
            <span className="text-sm leading-6 text-[#4d4943]">{label}</span>
          </button>
        ))}
      </div>
      <div className="mt-5 rounded-2xl bg-[#f7f3ec] p-4 text-sm leading-6 text-[#6d6962]">
        <div className="mb-1 flex items-center gap-2 font-bold text-[#171717]"><LockKeyhole className="h-4 w-4" /> {t('privacyTitle')}</div>
        {t('privacyText')}
      </div>
      <NavButtons back={back} next={next} disabled={!all} nextLabel={t('continue')} />
    </StageShell>
  );
}

function Capture({next, back, skip, photo, setPhoto}: {next: () => void; back: () => void; skip: () => void; photo: string | null; setPhoto: (v: string | null) => void}) {
  const t = useTranslations('capture');
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file?: File) {
    if (!file) return;
    setPhoto(URL.createObjectURL(file));
  }

  return (
    <StageShell title={t('title')} subtitle={t('subtitle')} icon={<Camera className="h-6 w-6" />}>
      <input ref={inputRef} type="file" accept="image/*" capture="user" hidden onChange={(e) => handleFile(e.target.files?.[0])} />
      {photo ? (
        <div className="relative overflow-hidden border border-[#ded7ca] bg-stone-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo} alt={t('previewAlt')} className="h-80 w-full object-cover" />
          <button onClick={() => setPhoto(null)} className="absolute end-3 top-3 rounded-full bg-black/55 p-2 text-white"><X className="h-4 w-4" /></button>
          <div className="absolute bottom-3 start-3 flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-xs font-bold text-emerald-700"><CircleCheck className="h-4 w-4" /> {t('qualityPass')}</div>
        </div>
      ) : (
        <button onClick={() => inputRef.current?.click()} className="group flex h-80 w-full flex-col items-center justify-center border-2 border-dashed border-[#d7cec0] bg-gradient-to-b from-white to-[#fbfaf7] transition hover:border-[#c9a64e]">
          <span className="flex h-20 w-20 items-center justify-center border border-[#d8bd72] bg-[#0d0d0d] text-[#d8bd72] shadow-sm transition group-hover:scale-105"><Camera className="h-8 w-8" /></span>
          <span className="mt-5 font-bold text-[#171717]">{t('takeOrUpload')}</span>
          <span className="mt-2 max-w-xs text-center text-sm leading-6 text-[#6d6962]">{t('tip')}</span>
        </button>
      )}
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-[#6d6962]">
        <div className="rounded-xl bg-[#f7f3ec] p-3"><SunMedium className="mx-auto mb-2 h-4 w-4" />{t('light')}</div>
        <div className="rounded-xl bg-[#f7f3ec] p-3"><ScanFace className="mx-auto mb-2 h-4 w-4" />{t('center')}</div>
        <div className="rounded-xl bg-[#f7f3ec] p-3"><Sparkles className="mx-auto mb-2 h-4 w-4" />{t('noFilter')}</div>
      </div>
      <button onClick={skip} className="mx-auto mt-5 block text-sm font-bold text-[#111111] underline decoration-[#d1007f] underline-offset-4">{t('skip')}</button>
      <NavButtons back={back} next={next} disabled={!photo} nextLabel={t('usePhoto')} />
    </StageShell>
  );
}

const questionDefs = [
  {id: 'feel', options: ['comfortable', 'dry', 'oily', 'combination']},
  {id: 'shine', options: ['rarely', 'hours', 'quickly', 'areas']},
  {id: 'sensitivity', options: ['rarely', 'sometimes', 'frequent', 'diagnosed']},
  {id: 'concern', options: ['dryness', 'dullness', 'tone', 'spots', 'blemishes', 'shine', 'lines', 'maintenance']},
  {id: 'climate', options: ['hot-humid', 'hot-dry', 'air-conditioned', 'sun', 'mild', 'cold-dry']},
  {id: 'texture', options: ['lightweight', 'rich', 'none']},
  {id: 'routine', options: ['essential', 'complete', 'ritual']}
] as const;

function Questions({answers, setAnswers, next, back}: {answers: Answers; setAnswers: (v: Answers) => void; next: () => void; back: () => void}) {
  const t = useTranslations('questions');
  const [index, setIndex] = useState(0);
  const q = questionDefs[index];
  const current = answers[q.id as keyof Answers];
  const isLast = index === questionDefs.length - 1;

  function select(value: string) {
    setAnswers({...answers, [q.id]: value});
  }

  function proceed() {
    if (isLast) next(); else setIndex(index + 1);
  }

  function goBack() {
    if (index === 0) back(); else setIndex(index - 1);
  }

  return (
    <StageShell title={t(`${q.id}.title`)} subtitle={t('step', {current: index + 1, total: questionDefs.length})} icon={<Droplets className="h-6 w-6" />}>
      <div className="mb-6 h-2 overflow-hidden rounded-full bg-[#eee7dc]"><div className="h-full rounded-full bg-[#111111] transition-all" style={{width: `${((index + 1) / questionDefs.length) * 100}%`}} /></div>
      <div className="grid gap-3 sm:grid-cols-2">
        {q.options.map((option) => (
          <button key={option} onClick={() => select(option)} className={`min-h-20 rounded-2xl border p-4 text-start text-sm font-semibold leading-5 transition ${current === option ? 'border-[#d1007f] bg-[#fff5fb] text-[#171717] shadow-sm' : 'border-[#e7e0d4] bg-white text-[#5f5a53] hover:border-[#c9a64e]'}`}>
            <span className="flex items-center justify-between gap-3">{t(`${q.id}.options.${option}`)} {current === option && <CircleCheck className="h-5 w-5 shrink-0 text-[#d1007f]" />}</span>
          </button>
        ))}
      </div>
      {q.id === 'sensitivity' && current === 'diagnosed' && <div className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">{t('medicalNotice')}</div>}
      <NavButtons back={goBack} next={proceed} nextLabel={isLast ? t('build') : t('next')} />
    </StageShell>
  );
}

function Analyzing({hasPhoto}: {hasPhoto: boolean}) {
  const t = useTranslations('analysis');
  const items = hasPhoto ? ['quality', 'visible', 'answers', 'matching', 'building'] : ['answers', 'matching', 'building'];
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 text-center">
      <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-[#f1eadb]">
        <div className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-t-[#d1007f]" />
        <ScanFace className="h-14 w-14 text-[#d1007f]" />
      </div>
      <h2 className="mt-8 font-display text-4xl font-semibold text-[#171717]">{t('title')}</h2>
      <p className="mt-3 text-[#6d6962]">{t('subtitle')}</p>
      <div className="mt-8 w-full space-y-3 text-start">
        {items.map((item, i) => (
          <div key={item} className="glass flex items-center gap-3 rounded-2xl px-4 py-3 shadow-sm" style={{opacity: 1 - i * .1}}>
            {i === items.length - 1 ? <LoaderCircle className="h-5 w-5 animate-spin text-[#d1007f]" /> : <CircleCheck className="h-5 w-5 text-emerald-600" />}
            <span className="text-sm font-semibold text-[#4d4943]">{t(item)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductCard({product, answers}: {product: Product; answers: Answers}) {
  const t = useTranslations('results');
  const locale = useLocale();
  return (
    <article className="group overflow-hidden border border-[#e5dfd4] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#c9a64e] hover:shadow-luxury">
      <ProductVisual accent={product.accent} initials={product.initials} imageUrl={product.imageUrl} compact />
      <div className="p-5">
        <div className="flex items-center justify-between gap-3 border-b border-[#eee8de] pb-3 text-[10px] font-extrabold uppercase tracking-[.14em] text-[#9a761f]">
          <span>{t(`steps.${product.step}`)}</span><span className="text-sm tracking-normal text-[#0d0d0d]">{new Intl.NumberFormat(locale, {style: 'currency', currency: 'EUR'}).format(product.price)}</span>
        </div>
        <h3 className="mt-4 min-h-12 font-display text-xl font-semibold leading-6 text-[#171717]">{product.name}</h3>
        <p className="mt-3 min-h-16 text-sm leading-6 text-[#6d6962]">{t('reason', {concern: t(`concerns.${answers.concern}`), climate: t(`climates.${answers.climate}`)})}</p>
        <a href={product.url} target="_blank" rel="noreferrer" className="mt-5 flex w-full items-center justify-center gap-2 bg-[#0d0d0d] px-4 py-3 text-xs font-bold uppercase tracking-[.08em] text-white transition hover:bg-[#d1007f]">
          {t('viewProduct')} <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

function Results({answers, reset, source}: {answers: Answers; reset: () => void; source: string}) {
  const t = useTranslations('results');
  const [tier, setTier] = useState<Answers['routine']>(answers.routine);
  const selected = useMemo(() => recommend(answers, tier), [answers, tier]);
  const total = selected.reduce((sum, p) => sum + p.price, 0);
  const locale = useLocale();

  return (
    <main className="mx-auto w-full max-w-7xl px-5 pb-20 pt-4 md:px-8">
      <section className="relative overflow-hidden border border-[#2b2b2b] bg-[#0d0d0d] p-6 text-white shadow-luxury md:p-10">
        <div className="absolute inset-x-0 top-0 h-1 bg-[#d1007f]" />
        <div className="absolute -end-12 -top-16 h-52 w-52 rounded-full border border-[#c9a64e]/25" />
        <div className="grid gap-8 md:grid-cols-[1.15fr_.85fr] md:items-center">
          <div className="relative">
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[.18em] text-[#d8bd72]"><span className="h-px w-8 bg-[#d8bd72]" /><Sparkles className="h-4 w-4" /> {t('profile')}</div>
            <h1 className="mt-5 font-display text-4xl font-semibold md:text-6xl">{t('profileTitle')}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/[.72]">{t('summary', {concern: t(`concerns.${answers.concern}`), climate: t(`climates.${answers.climate}`)})}</p>
            <div className="mt-6 inline-flex items-center gap-2 border-s-2 border-[#d1007f] ps-3 text-xs text-white/[.65]"><ShieldCheck className="h-4 w-4" /> {source === 'questionnaire-only' ? t('questionnaireOnly') : t('photoAndAnswers')}</div>
          </div>
          <div className="relative grid grid-cols-2 gap-px overflow-hidden border border-white/[.15] bg-white/[.15]">
            <Metric value={answers.feel === 'dry' ? t('levels.high') : t('levels.moderate')} label={t('hydrationNeed')} />
            <Metric value={answers.shine === 'quickly' ? t('levels.high') : t('levels.low')} label={t('visibleShine')} />
            <Metric value={t(`levels.${answers.concern === 'tone' || answers.concern === 'spots' ? 'moderate' : 'low'}`)} label={t('uneven')} />
            <Metric value={t(`sensitivity.${answers.sensitivity}`)} label={t('declaredSensitivity')} />
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-col justify-between gap-5 border-b border-[#ded7ca] pb-5 md:flex-row md:items-end">
          <div><div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[.18em] text-[#9a761f]"><span className="h-px w-8 bg-[#c9a64e]" />{t('routineEyebrow')}</div><h2 className="mt-3 font-display text-4xl font-semibold text-[#171717]">{t('routineTitle')}</h2></div>
          <div className="flex overflow-hidden border border-[#d9d1c4] bg-white">
            {(['essential', 'complete', 'ritual'] as const).map((item) => (
              <button key={item} onClick={() => setTier(item)} className={`border-e border-[#e7e0d4] px-4 py-3 text-xs font-bold uppercase tracking-[.05em] transition last:border-e-0 md:text-sm ${tier === item ? 'bg-[#d1007f] text-white' : 'text-[#5f5a53] hover:bg-[#f7f3ec]'}`}>{t(`tiers.${item}`)}</button>
            ))}
          </div>
        </div>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {selected.map((product) => <ProductCard key={product.id} product={product} answers={answers} />)}
        </div>
        <div className="mt-7 flex flex-col items-center justify-between gap-4 border border-[#d9d1c4] bg-white p-5 shadow-sm sm:flex-row">
          <div><div className="text-xs font-bold uppercase tracking-[.12em] text-[#817a70]">{t('estimatedTotal')}</div><div className="mt-1 font-display text-3xl font-bold text-[#0d0d0d]">{new Intl.NumberFormat(locale, {style: 'currency', currency: 'EUR'}).format(total)}</div></div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <button onClick={reset} className="border border-[#0d0d0d] px-5 py-3 text-xs font-bold uppercase tracking-[.07em] text-[#0d0d0d] transition hover:bg-[#0d0d0d] hover:text-white">{t('restart')}</button>
            <a href="https://www.carimoempire.com/shop/" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-[#d1007f] px-6 py-3 text-xs font-bold uppercase tracking-[.07em] text-white transition hover:bg-[#a90067]"><ShoppingBag className="h-4 w-4" /> {t('shopRoutine')}</a>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-5 md:grid-cols-3">
        <Trust icon={<LockKeyhole />} title={t('trust.privateTitle')} text={t('trust.privateText')} />
        <Trust icon={<ShieldCheck />} title={t('trust.guidanceTitle')} text={t('trust.guidanceText')} />
        <Trust icon={<WandSparkles />} title={t('trust.personalTitle')} text={t('trust.personalText')} />
      </section>
    </main>
  );
}

function Metric({value, label}: {value: string; label: string}) {
  return <div className="bg-[#151515] p-4"><div className="font-display text-2xl font-bold text-[#d8bd72]">{value}</div><div className="mt-1 text-xs text-white/60">{label}</div></div>;
}

function Trust({icon, title, text}: {icon: ReactNode; title: string; text: string}) {
  return <div className="border border-[#e0d9cd] bg-white p-6"><div className="flex h-11 w-11 items-center justify-center border border-[#d8bd72] bg-[#0d0d0d] text-[#d8bd72]">{icon}</div><h3 className="mt-4 font-display text-xl font-semibold">{title}</h3><div className="mt-3 h-px w-10 bg-[#d1007f]" /><p className="mt-3 text-sm leading-6 text-[#6d6962]">{text}</p></div>;
}

function StageShell({title, subtitle, icon, children}: {title: string; subtitle: string; icon: ReactNode; children: ReactNode}) {
  return (
    <main className="mx-auto w-full max-w-2xl px-5 pb-16 pt-6">
      <div className="relative border border-[#ded7ca] bg-white p-5 shadow-luxury md:p-8">
        <div className="absolute inset-x-0 top-0 h-1 bg-[#d1007f]" />
        <div className="flex h-12 w-12 items-center justify-center border border-[#d8bd72] bg-[#0d0d0d] text-[#d8bd72]">{icon}</div>
        <div className="mt-5 h-px w-14 bg-[#c9a64e]" />
        <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-[#171717] md:text-4xl">{title}</h1>
        <p className="mb-7 mt-2 leading-7 text-[#6d6962]">{subtitle}</p>
        {children}
      </div>
    </main>
  );
}

function NavButtons({back, next, disabled = false, nextLabel}: {back: () => void; next: () => void; disabled?: boolean; nextLabel: string}) {
  const t = useTranslations('common');
  return (
    <div className="mt-7 flex items-center justify-between gap-3">
      <button onClick={back} className="flex items-center gap-2 px-4 py-3 text-sm font-bold text-[#6d6962] transition hover:text-[#d1007f]"><ArrowLeft className="rtl-flip h-4 w-4" /> {t('back')}</button>
      <button onClick={next} disabled={disabled} className="flex items-center gap-2 bg-[#d1007f] px-6 py-3 text-sm font-bold uppercase tracking-[.05em] text-white transition hover:bg-[#a90067] disabled:cursor-not-allowed disabled:opacity-35">{nextLabel} <ArrowRight className="rtl-flip h-4 w-4" /></button>
    </div>
  );
}

export function SkinMatchDemo() {
  const locale = useLocale();
  const [stage, setStage] = useState<Stage>('landing');
  const [photo, setPhoto] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answers>(defaultAnswers);
  const [source, setSource] = useState('photo-and-questionnaire');

  function reset() { setStage('landing'); setPhoto(null); setAnswers(defaultAnswers); }
  function skipToQuestions() { setPhoto(null); setStage('questions'); }

  async function analyze() {
    setStage('analyzing');
    try {
      const response = await fetch('/api/analyze', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({answers, hasPhoto: Boolean(photo)})});
      const data = await response.json();
      setSource(data.source || 'questionnaire-only');
    } catch {
      setSource('questionnaire-only');
    }
    setTimeout(() => setStage('results'), 1700);
  }

  return (
    <div className="min-h-screen">
      <Header reset={reset} />
      <Progress stage={stage} />
      {stage === 'landing' && <Landing start={() => setStage('consent')} skipPhoto={skipToQuestions} />}
      {stage === 'consent' && <Consent back={() => setStage('landing')} next={() => setStage('capture')} />}
      {stage === 'capture' && <Capture back={() => setStage('consent')} next={() => setStage('questions')} skip={skipToQuestions} photo={photo} setPhoto={setPhoto} />}
      {stage === 'questions' && <Questions answers={answers} setAnswers={setAnswers} back={() => setStage(photo ? 'capture' : 'landing')} next={analyze} />}
      {stage === 'analyzing' && <Analyzing hasPhoto={Boolean(photo)} />}
      {stage === 'results' && <Results answers={answers} reset={reset} source={source} />}
      <footer className="mt-8 border-t border-[#2b2b2b] bg-[#0d0d0d] text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 text-center text-xs text-white/60 md:flex-row md:px-8 md:text-start">
          <div className="flex items-center gap-3"><Crown className="h-5 w-5 text-[#d8bd72]" /><span className="font-bold uppercase tracking-[.12em] text-white">CARIMO SkinMatch AI</span><span className="text-[#d1007f]">·</span><span>Concept demo</span></div>
          <span>{locale === 'ar' ? 'إرشادات تجميلية وليست تشخيصاً طبياً' : locale === 'fr' ? 'Conseils cosmétiques — pas un diagnostic médical' : 'Cosmetic guidance — not a medical diagnosis'}</span>
        </div>
      </footer>
    </div>
  );
}
