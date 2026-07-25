'use client';

import {AnimatePresence, motion, useReducedMotion} from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  ChevronDown,
  CircleCheck,
  Clock3,
  Crown,
  Droplets,
  ExternalLink,
  Eye,
  Feather,
  Gem,
  Globe2,
  Heart,
  Leaf,
  LoaderCircle,
  LockKeyhole,
  MoonStar,
  ScanFace,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  SunMedium,
  WandSparkles,
  X
} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import {usePathname, useRouter} from 'next/navigation';
import {useEffect, useMemo, useRef, useState, type ReactNode} from 'react';
import {recommend, type Answers} from '@/lib/recommendations';
import type {Product} from '@/lib/products';
import {ProductVisual} from './product-visual';

const locales = ['en', 'ar', 'fr'] as const;
type Locale = (typeof locales)[number];
type Stage = 'welcome' | 'privacy' | 'portrait' | 'consultation' | 'atelier' | 'reveal';

type Copy = {
  privateSuite: string;
  privateConsultation: string;
  invitation: string;
  appointmentNote: string;
  start: string;
  withoutPhoto: string;
  signature: string;
  signatureText: string;
  calm: string;
  calmText: string;
  considered: string;
  consideredText: string;
  concierge: string;
  conciergeText: string;
  privacyEyebrow: string;
  portraitEyebrow: string;
  consultationEyebrow: string;
  atelierEyebrow: string;
  revealEyebrow: string;
  session: string;
  step: string;
  secure: string;
  portraitStudio: string;
  portraitStudioText: string;
  photoReady: string;
  replacePhoto: string;
  chooseAnswer: string;
  atelierTitle: string;
  atelierText: string;
  curation: string;
  profile: string;
  profileText: string;
  ritualIntro: string;
  ritualDescription: string;
  recommended: string;
  chapter: string;
  whySelected: string;
  yourInvestment: string;
  officialBoutique: string;
  beginAgain: string;
  privateGuidance: string;
  cosmeticOnly: string;
  explainable: string;
  privilege: string;
  privilegeText: string;
  observed: string;
  declared: string;
  morning: string;
  evening: string;
  tailoredFor: string;
};

const copy: Record<Locale, Copy> = {
  en: {
    privateSuite: 'The CARIMO Private Suite',
    privateConsultation: 'A private beauty consultation, curated around you.',
    invitation: 'Enter a calm, confidential experience where your skin goals, climate and preferences become a considered CARIMO ritual.',
    appointmentNote: 'Your private appointment takes less than two minutes.',
    start: 'Begin my consultation',
    withoutPhoto: 'Continue discreetly without a photo',
    signature: 'A signature ritual',
    signatureText: 'Every product has a clear place, purpose and reason to belong.',
    calm: 'Calm by design',
    calmText: 'One considered question at a time, with no unnecessary complexity.',
    considered: 'Thoughtfully matched',
    consideredText: 'Your routine reflects your beauty goals, environment and comfort.',
    concierge: 'Private guidance',
    conciergeText: 'A premium path from discovery to the official CARIMO boutique.',
    privacyEyebrow: 'Your private suite',
    portraitEyebrow: 'The portrait studio',
    consultationEyebrow: 'Your beauty consultation',
    atelierEyebrow: 'The CARIMO atelier',
    revealEyebrow: 'Your private reveal',
    session: 'Private session',
    step: 'Step',
    secure: 'Private and temporary',
    portraitStudio: 'A natural portrait is all we need',
    portraitStudioText: 'Soft, even light helps us create more considered cosmetic guidance. Your photo is not permanently stored.',
    photoReady: 'Portrait ready for consultation',
    replacePhoto: 'Replace portrait',
    chooseAnswer: 'Choose the answer that feels most true today.',
    atelierTitle: 'Your ritual is being curated',
    atelierText: 'We are bringing together your preferences, environment and CARIMO product matches.',
    curation: 'Private curation in progress',
    profile: 'Your beauty profile',
    profileText: 'A clear reading of what you shared and what the portrait can reasonably support.',
    ritualIntro: 'Your CARIMO ritual',
    ritualDescription: 'Choose the level of care that suits your rhythm. Each ritual remains coherent, explainable and shoppable.',
    recommended: 'Recommended',
    chapter: 'Ritual chapter',
    whySelected: 'Why this belongs in your ritual',
    yourInvestment: 'Your ritual investment',
    officialBoutique: 'Continue to the official boutique',
    beginAgain: 'Begin a new consultation',
    privateGuidance: 'Private by design',
    cosmeticOnly: 'Cosmetic guidance only',
    explainable: 'Every match explained',
    privilege: 'A privileged experience',
    privilegeText: 'From the first question to the final ritual, every detail is designed to feel calm, personal and considered.',
    observed: 'Observed from the portrait',
    declared: 'Shared by you',
    morning: 'Morning ritual',
    evening: 'Evening ritual',
    tailoredFor: 'Tailored for'
  },
  fr: {
    privateSuite: 'La Suite Privée CARIMO',
    privateConsultation: 'Une consultation beauté privée, entièrement pensée autour de vous.',
    invitation: 'Entrez dans une expérience calme et confidentielle où vos objectifs, votre climat et vos préférences deviennent un rituel CARIMO cohérent.',
    appointmentNote: 'Votre rendez-vous privé dure moins de deux minutes.',
    start: 'Commencer ma consultation',
    withoutPhoto: 'Continuer discrètement sans photo',
    signature: 'Un rituel signature',
    signatureText: 'Chaque produit possède une place, une fonction et une raison précise.',
    calm: 'Une expérience apaisée',
    calmText: 'Une seule question à la fois, sans complexité inutile.',
    considered: 'Sélection réfléchie',
    consideredText: 'Votre routine tient compte de vos objectifs, de votre environnement et de votre confort.',
    concierge: 'Accompagnement privé',
    conciergeText: 'Un parcours premium, de la découverte à la boutique officielle CARIMO.',
    privacyEyebrow: 'Votre suite privée',
    portraitEyebrow: 'Le studio portrait',
    consultationEyebrow: 'Votre consultation beauté',
    atelierEyebrow: 'L’atelier CARIMO',
    revealEyebrow: 'Votre révélation privée',
    session: 'Session privée',
    step: 'Étape',
    secure: 'Privé et temporaire',
    portraitStudio: 'Un portrait naturel suffit',
    portraitStudioText: 'Une lumière douce et uniforme permet de proposer des conseils cosmétiques plus réfléchis. Votre photo n’est pas conservée durablement.',
    photoReady: 'Portrait prêt pour la consultation',
    replacePhoto: 'Remplacer le portrait',
    chooseAnswer: 'Choisissez la réponse qui vous correspond le mieux aujourd’hui.',
    atelierTitle: 'Votre rituel est en cours de composition',
    atelierText: 'Nous réunissons vos préférences, votre environnement et les correspondances produits CARIMO.',
    curation: 'Sélection privée en cours',
    profile: 'Votre profil beauté',
    profileText: 'Une lecture claire de ce que vous avez partagé et de ce que le portrait peut raisonnablement suggérer.',
    ritualIntro: 'Votre rituel CARIMO',
    ritualDescription: 'Choisissez le niveau de soin adapté à votre rythme. Chaque rituel reste cohérent, expliqué et directement accessible.',
    recommended: 'Recommandé',
    chapter: 'Chapitre du rituel',
    whySelected: 'Pourquoi ce soin appartient à votre rituel',
    yourInvestment: 'Valeur de votre rituel',
    officialBoutique: 'Continuer vers la boutique officielle',
    beginAgain: 'Commencer une nouvelle consultation',
    privateGuidance: 'Confidentialité intégrée',
    cosmeticOnly: 'Conseils cosmétiques uniquement',
    explainable: 'Chaque choix est expliqué',
    privilege: 'Une expérience privilégiée',
    privilegeText: 'De la première question au rituel final, chaque détail est conçu pour être calme, personnel et attentionné.',
    observed: 'Observé à partir du portrait',
    declared: 'Partagé par vous',
    morning: 'Rituel du matin',
    evening: 'Rituel du soir',
    tailoredFor: 'Pensé pour'
  },
  ar: {
    privateSuite: 'جناح CARIMO الخاص',
    privateConsultation: 'استشارة جمال خاصة صُممت بالكامل من أجلك.',
    invitation: 'ادخلي تجربة هادئة وسرية تتحول فيها أهدافك وبيئتك وتفضيلاتك إلى طقس عناية متكامل من CARIMO.',
    appointmentNote: 'موعدك الخاص يستغرق أقل من دقيقتين.',
    start: 'ابدئي استشارتي',
    withoutPhoto: 'المتابعة بخصوصية من دون صورة',
    signature: 'طقس عناية مميز',
    signatureText: 'لكل منتج مكان واضح وهدف وسبب محدد ضمن روتينك.',
    calm: 'هدوء في كل تفصيل',
    calmText: 'سؤال واحد مدروس في كل خطوة، من دون تعقيد غير ضروري.',
    considered: 'اختيار بعناية',
    consideredText: 'يعكس روتينك أهدافك الجمالية وبيئتك وراحتك.',
    concierge: 'إرشاد خاص',
    conciergeText: 'مسار فاخر من الاكتشاف إلى متجر CARIMO الرسمي.',
    privacyEyebrow: 'جناحك الخاص',
    portraitEyebrow: 'استوديو الصورة',
    consultationEyebrow: 'استشارتك الجمالية',
    atelierEyebrow: 'مشغل CARIMO',
    revealEyebrow: 'لحظة الكشف الخاصة',
    session: 'جلسة خاصة',
    step: 'الخطوة',
    secure: 'خاص ومؤقت',
    portraitStudio: 'كل ما نحتاجه هو صورة طبيعية',
    portraitStudioText: 'تساعد الإضاءة الهادئة والمتوازنة على تقديم إرشاد تجميلي أكثر دقة. لا يتم الاحتفاظ بصورتك بشكل دائم.',
    photoReady: 'الصورة جاهزة للاستشارة',
    replacePhoto: 'استبدال الصورة',
    chooseAnswer: 'اختاري الإجابة الأقرب إلى حالتك اليوم.',
    atelierTitle: 'يتم الآن تنسيق طقس العناية الخاص بك',
    atelierText: 'نجمع تفضيلاتك وبيئتك مع أفضل تطابقات منتجات CARIMO.',
    curation: 'جاري التنسيق الخاص',
    profile: 'ملف جمالك',
    profileText: 'قراءة واضحة لما شاركته وما يمكن للصورة أن يدعمه بشكل معقول.',
    ritualIntro: 'طقس CARIMO الخاص بك',
    ritualDescription: 'اختاري مستوى العناية المناسب لإيقاع حياتك. كل طقس متكامل ومفسر وقابل للتسوق.',
    recommended: 'موصى به',
    chapter: 'مرحلة الطقس',
    whySelected: 'لماذا ينتمي هذا المنتج إلى روتينك',
    yourInvestment: 'قيمة طقس العناية',
    officialBoutique: 'الانتقال إلى المتجر الرسمي',
    beginAgain: 'بدء استشارة جديدة',
    privateGuidance: 'خصوصية في التصميم',
    cosmeticOnly: 'إرشاد تجميلي فقط',
    explainable: 'كل اختيار موضح',
    privilege: 'تجربة استثنائية',
    privilegeText: 'من السؤال الأول إلى طقس العناية النهائي، صُمم كل تفصيل ليكون هادئاً وشخصياً ومدروساً.',
    observed: 'ملاحظ من الصورة',
    declared: 'تمت مشاركته منك',
    morning: 'طقس الصباح',
    evening: 'طقس المساء',
    tailoredFor: 'مصمم من أجل'
  }
};

const defaultAnswers: Answers = {
  feel: 'dry',
  shine: 'rarely',
  sensitivity: 'sometimes',
  concern: 'tone',
  climate: 'air-conditioned',
  texture: 'lightweight',
  routine: 'complete'
};

const questionDefs = [
  {id: 'feel', options: ['comfortable', 'dry', 'oily', 'combination'], icon: Droplets},
  {id: 'shine', options: ['rarely', 'hours', 'quickly', 'areas'], icon: SunMedium},
  {id: 'sensitivity', options: ['rarely', 'sometimes', 'frequent', 'diagnosed'], icon: Feather},
  {id: 'concern', options: ['dryness', 'dullness', 'tone', 'spots', 'blemishes', 'shine', 'lines', 'maintenance'], icon: Sparkles},
  {id: 'climate', options: ['hot-humid', 'hot-dry', 'air-conditioned', 'sun', 'mild', 'cold-dry'], icon: Globe2},
  {id: 'texture', options: ['lightweight', 'rich', 'none'], icon: Leaf},
  {id: 'routine', options: ['essential', 'complete', 'ritual'], icon: Crown}
] as const;

const stageOrder: Stage[] = ['welcome', 'privacy', 'portrait', 'consultation', 'atelier', 'reveal'];

function BrandMark({inverse = false}: {inverse?: boolean}) {
  return (
    <div className="flex items-center gap-3 text-start">
      <div className={`brand-seal ${inverse ? 'brand-seal-inverse' : ''}`}>
        <Crown className="h-5 w-5" strokeWidth={1.45} />
      </div>
      <div>
        <div className={`font-display text-[1.08rem] font-semibold tracking-[.24em] ${inverse ? 'text-white' : 'text-[var(--ink)]'}`}>CARIMO</div>
        <div className={`mt-1 text-[8px] font-semibold uppercase tracking-[.31em] ${inverse ? 'text-white/50' : 'text-[var(--muted)]'}`}>Private Beauty Suite</div>
      </div>
    </div>
  );
}

function LanguageSelector() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const names: Record<Locale, string> = {en: 'English', ar: 'العربية', fr: 'Français'};

  function switchLocale(next: Locale) {
    const segments = pathname.split('/');
    segments[1] = next;
    localStorage.setItem('carimo_locale', next);
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; samesite=lax`;
    router.replace(segments.join('/') || `/${next}`);
    setOpen(false);
  }

  return (
    <div className="relative">
      <button className="language-trigger" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-haspopup="listbox">
        <Globe2 className="h-4 w-4" />
        <span className="hidden sm:inline">{names[locale]}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity: 0, y: 8, scale: .98}} animate={{opacity: 1, y: 0, scale: 1}} exit={{opacity: 0, y: 6, scale: .98}} className="language-menu" role="listbox">
            {locales.map((item) => (
              <button key={item} onClick={() => switchLocale(item)} className={item === locale ? 'is-active' : ''} role="option" aria-selected={item === locale}>
                <span>{names[item]}</span>{item === locale && <Check className="h-4 w-4" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Header({reset, stage}: {reset: () => void; stage: Stage}) {
  const locale = useLocale() as Locale;
  const c = copy[locale];
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <button onClick={reset} aria-label="CARIMO SkinMatch home"><BrandMark /></button>
        <div className="hidden items-center gap-3 lg:flex">
          <span className="header-whisper"><LockKeyhole className="h-3.5 w-3.5" /> {c.session}</span>
          {stage !== 'welcome' && <StageDots stage={stage} compact />}
        </div>
        <div className="flex items-center gap-2">
          <a className="boutique-link hidden sm:inline-flex" href="https://www.carimoempire.com/shop/" target="_blank" rel="noreferrer"><ShoppingBag className="h-4 w-4" /><span>{c.officialBoutique}</span></a>
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
}

function StageDots({stage, compact = false}: {stage: Stage; compact?: boolean}) {
  const active = stageOrder.indexOf(stage);
  return <div className={compact ? 'stage-dots compact' : 'stage-dots'} aria-label="Consultation progress">{stageOrder.slice(1, -1).map((item, index) => <span key={item} className={index <= active - 1 ? 'active' : ''} />)}</div>;
}

function PageTransition({children, stage}: {children: ReactNode; stage: Stage}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div key={stage} initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: 18, filter: 'blur(6px)'}} animate={reduceMotion ? {opacity: 1} : {opacity: 1, y: 0, filter: 'blur(0px)'}} exit={reduceMotion ? {opacity: 0} : {opacity: 0, y: -10, filter: 'blur(4px)'}} transition={{duration: reduceMotion ? .15 : .55, ease: [0.22, 1, 0.36, 1]}}>
      {children}
    </motion.div>
  );
}

function Welcome({start, skip}: {start: () => void; skip: () => void}) {
  const locale = useLocale() as Locale;
  const c = copy[locale];
  const tLanding = useTranslations('landing');
  return (
    <main className="welcome-page">
      <div className="welcome-glow welcome-glow-one" /><div className="welcome-glow welcome-glow-two" />
      <section className="welcome-copy">
        <div className="editorial-kicker"><span /><Gem className="h-4 w-4" /> {c.privateSuite}</div>
        <h1>{c.privateConsultation}</h1>
        <p className="welcome-lead">{c.invitation}</p>
        <div className="welcome-actions">
          <button className="button-primary" onClick={start}><span>{c.start}</span><ArrowRight className="rtl-flip h-4 w-4" /></button>
          <button className="button-quiet" onClick={skip}>{c.withoutPhoto}</button>
        </div>
        <div className="appointment-note"><Clock3 className="h-4 w-4" /> {c.appointmentNote}</div>
        <div className="welcome-pillars">
          <ExperiencePillar icon={<MoonStar />} title={c.calm} text={c.calmText} />
          <ExperiencePillar icon={<WandSparkles />} title={c.considered} text={c.consideredText} />
          <ExperiencePillar icon={<LockKeyhole />} title={c.concierge} text={c.conciergeText} />
        </div>
      </section>
      <section className="welcome-visual" aria-label={tLanding('livePreview')}>
        <div className="visual-frame-outer"><div className="visual-frame-inner">
          <div className="visual-topline"><span>{c.privateSuite}</span><span className="live-dot"><i /> {tLanding('livePreview')}</span></div>
          <div className="portrait-composition"><div className="portrait-halo" /><div className="portrait-silhouette"><div className="portrait-hair" /><div className="portrait-face"><span className="eye eye-left" /><span className="eye eye-right" /><span className="nose" /><span className="mouth" /></div><div className="portrait-scan" /></div><div className="portrait-caption"><span>{c.tailoredFor}</span><strong>{tLanding('personalMatch')}</strong></div></div>
          <div className="visual-insights"><Insight label={tLanding('hydration')} value="78%" /><Insight label={tLanding('shine')} value="Low" /><Insight label={tLanding('match')} value="92%" accent /></div>
          <div className="signature-preview"><div className="signature-product"><img src="https://www.carimoempire.com/wp-content/uploads/2024/05/24k-gamme-4-352x440.png" alt="" /></div><div><span>{c.signature}</span><strong>CARIMO Complete Ritual</strong><p>{c.signatureText}</p></div><CircleCheck className="h-6 w-6 text-[var(--rose)]" /></div>
        </div></div>
        <div className="floating-card floating-card-top"><Sparkles className="h-4 w-4" /> {c.privilege}</div><div className="floating-card floating-card-bottom"><Globe2 className="h-4 w-4" /> English · العربية · Français</div>
      </section>
    </main>
  );
}

function ExperiencePillar({icon, title, text}: {icon: ReactNode; title: string; text: string}) { return <article><span className="pillar-icon">{icon}</span><div><h3>{title}</h3><p>{text}</p></div></article>; }
function Insight({label, value, accent = false}: {label: string; value: string; accent?: boolean}) { return <div className={accent ? 'insight accent' : 'insight'}><strong>{value}</strong><span>{label}</span></div>; }

function ConsultationFrame({eyebrow, title, description, icon, stage, children}: {eyebrow: string; title: string; description: string; icon: ReactNode; stage: Stage; children: ReactNode}) {
  const locale = useLocale() as Locale;
  const c = copy[locale];
  const current = Math.max(1, stageOrder.indexOf(stage));
  return (
    <main className="consultation-page">
      <aside className="consultation-aside"><div className="aside-monogram"><Crown className="h-6 w-6" /></div><div className="aside-copy"><span>{c.session}</span><strong>{String(current).padStart(2, '0')}</strong><small>{c.step}</small></div><StageDots stage={stage} /><div className="aside-security"><LockKeyhole className="h-4 w-4" /> {c.secure}</div></aside>
      <section className="consultation-card"><div className="consultation-heading"><div className="consultation-icon">{icon}</div><div><div className="editorial-kicker"><span /> {eyebrow}</div><h1>{title}</h1><p>{description}</p></div></div><div className="consultation-body">{children}</div></section>
    </main>
  );
}

function Privacy({next, back}: {next: () => void; back: () => void}) {
  const locale = useLocale() as Locale;
  const c = copy[locale];
  const t = useTranslations('consent');
  const [checks, setChecks] = useState([false, false, false]);
  const all = checks.every(Boolean);
  const items = [{label: t('temporary'), icon: LockKeyhole}, {label: t('nonDiagnostic'), icon: ShieldCheck}, {label: t('recommendations'), icon: Sparkles}];
  return <ConsultationFrame stage="privacy" eyebrow={c.privacyEyebrow} title={t('title')} description={t('subtitle')} icon={<ShieldCheck className="h-6 w-6" />}><div className="privacy-grid">{items.map(({label, icon: Icon}, index) => <button key={label} className={checks[index] ? 'consent-card selected' : 'consent-card'} onClick={() => setChecks((old) => old.map((value, item) => item === index ? !value : value))}><span className="consent-icon"><Icon className="h-5 w-5" /></span><span>{label}</span><i>{checks[index] && <Check className="h-4 w-4" />}</i></button>)}</div><div className="privacy-note"><LockKeyhole className="h-5 w-5" /><div><strong>{t('privacyTitle')}</strong><p>{t('privacyText')}</p></div></div><Navigation back={back} next={next} disabled={!all} nextLabel={t('continue')} /></ConsultationFrame>;
}

function Portrait({next, back, skip, photo, setPhoto}: {next: () => void; back: () => void; skip: () => void; photo: string | null; setPhoto: (value: string | null) => void}) {
  const locale = useLocale() as Locale;
  const c = copy[locale];
  const t = useTranslations('capture');
  const input = useRef<HTMLInputElement>(null);
  function choose(file?: File) { if (file) setPhoto(URL.createObjectURL(file)); }
  return <ConsultationFrame stage="portrait" eyebrow={c.portraitEyebrow} title={c.portraitStudio} description={c.portraitStudioText} icon={<Camera className="h-6 w-6" />}><input ref={input} hidden type="file" accept="image/*" capture="user" onChange={(event) => choose(event.target.files?.[0])} /><div className="portrait-studio">{photo ? <div className="portrait-preview"><img src={photo} alt={t('previewAlt')} /><div className="portrait-guide"><span /><span /><span /><span /></div><div className="portrait-ready"><CircleCheck className="h-4 w-4" /> {c.photoReady}</div><button className="portrait-remove" onClick={() => setPhoto(null)} aria-label={c.replacePhoto}><X className="h-4 w-4" /></button></div> : <button className="portrait-upload" onClick={() => input.current?.click()}><span className="camera-orbit"><Camera className="h-8 w-8" /></span><strong>{t('takeOrUpload')}</strong><p>{t('tip')}</p><i>{c.secure}</i></button>}<div className="studio-directions"><Direction icon={<SunMedium />} text={t('light')} /><Direction icon={<ScanFace />} text={t('center')} /><Direction icon={<Sparkles />} text={t('noFilter')} /></div></div><button className="text-link" onClick={skip}>{t('skip')}</button><Navigation back={back} next={next} disabled={!photo} nextLabel={t('usePhoto')} /></ConsultationFrame>;
}
function Direction({icon, text}: {icon: ReactNode; text: string}) { return <div><span>{icon}</span><p>{text}</p></div>; }

function Consultation({answers, setAnswers, next, back}: {answers: Answers; setAnswers: (answers: Answers) => void; next: () => void; back: () => void}) {
  const locale = useLocale() as Locale;
  const c = copy[locale];
  const t = useTranslations('questions');
  const [index, setIndex] = useState(0);
  const question = questionDefs[index];
  const current = answers[question.id as keyof Answers];
  const isLast = index === questionDefs.length - 1;
  const Icon = question.icon;
  function select(value: string) { setAnswers({...answers, [question.id]: value}); }
  function forward() { if (isLast) next(); else setIndex((value) => value + 1); }
  function backward() { if (index === 0) back(); else setIndex((value) => value - 1); }
  return <ConsultationFrame stage="consultation" eyebrow={c.consultationEyebrow} title={t(`${question.id}.title`)} description={c.chooseAnswer} icon={<Icon className="h-6 w-6" />}><div className="question-meter"><span style={{width: `${((index + 1) / questionDefs.length) * 100}%`}} /><small>{t('step', {current: index + 1, total: questionDefs.length})}</small></div><div className={`answer-grid ${question.options.length > 6 ? 'answer-grid-dense' : ''}`}>{question.options.map((option, optionIndex) => <button key={option} onClick={() => select(option)} className={current === option ? 'answer-card selected' : 'answer-card'}><span className="answer-index">{String(optionIndex + 1).padStart(2, '0')}</span><span className="answer-label">{t(`${question.id}.options.${option}`)}</span><span className="answer-check">{current === option && <Check className="h-4 w-4" />}</span></button>)}</div>{question.id === 'sensitivity' && current === 'diagnosed' && <div className="medical-note"><ShieldCheck className="h-5 w-5" /> {t('medicalNotice')}</div>}<Navigation back={backward} next={forward} nextLabel={isLast ? t('build') : t('next')} /></ConsultationFrame>;
}

function Atelier({hasPhoto}: {hasPhoto: boolean}) {
  const locale = useLocale() as Locale;
  const c = copy[locale];
  const t = useTranslations('analysis');
  const steps = hasPhoto ? ['quality', 'visible', 'answers', 'matching', 'building'] : ['answers', 'matching', 'building'];
  return <main className="atelier-page"><div className="atelier-orbit orbit-one" /><div className="atelier-orbit orbit-two" /><div className="atelier-center"><div className="editorial-kicker light"><span /> {c.atelierEyebrow}</div><div className="atelier-emblem"><Crown className="h-8 w-8" /><span /></div><h1>{c.atelierTitle}</h1><p>{c.atelierText}</p><div className="atelier-status"><i /><span>{c.curation}</span></div><div className="atelier-steps">{steps.map((step, index) => <motion.div key={step} initial={{opacity: 0, y: 12}} animate={{opacity: 1, y: 0}} transition={{delay: .2 + index * .18}}>{index === steps.length - 1 ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <CircleCheck className="h-5 w-5" />}<span>{t(step)}</span></motion.div>)}</div></div></main>;
}

function Reveal({answers, reset, source}: {answers: Answers; reset: () => void; source: string}) {
  const locale = useLocale() as Locale;
  const c = copy[locale];
  const t = useTranslations('results');
  const [tier, setTier] = useState<Answers['routine']>(answers.routine);
  const products = useMemo(() => recommend(answers, tier), [answers, tier]);
  const total = products.reduce((sum, product) => sum + product.price, 0);
  const price = new Intl.NumberFormat(locale, {style: 'currency', currency: 'EUR'}).format(total);
  const metrics = [{label: t('hydrationNeed'), value: answers.feel === 'dry' ? t('levels.high') : t('levels.moderate')}, {label: t('visibleShine'), value: answers.shine === 'quickly' ? t('levels.high') : t('levels.low')}, {label: t('uneven'), value: t(`levels.${answers.concern === 'tone' || answers.concern === 'spots' ? 'moderate' : 'low'}`)}, {label: t('declaredSensitivity'), value: t(`sensitivity.${answers.sensitivity}`)}];
  return <main className="reveal-page"><section className="reveal-hero"><div className="reveal-hero-copy"><div className="editorial-kicker light"><span /> {c.revealEyebrow}</div><h1>{t('profileTitle')}</h1><p>{t('summary', {concern: t(`concerns.${answers.concern}`), climate: t(`climates.${answers.climate}`)})}</p><div className="source-badge"><ShieldCheck className="h-4 w-4" /> {source === 'questionnaire-only' ? t('questionnaireOnly') : t('photoAndAnswers')}</div></div><div className="profile-jewel"><div className="profile-jewel-inner"><Crown className="h-9 w-9" /><span>CARIMO</span><small>SkinMatch</small></div></div></section><section className="profile-section"><div className="section-heading"><div><span>{c.profile}</span><h2>{c.profileText}</h2></div><div className="profile-source-legend"><span><Eye className="h-4 w-4" /> {c.observed}</span><span><Heart className="h-4 w-4" /> {c.declared}</span></div></div><div className="metric-grid">{metrics.map((metric, index) => <MetricCard key={metric.label} {...metric} index={index} />)}</div></section><section className="ritual-section"><div className="section-heading ritual-heading"><div><span>{c.ritualIntro}</span><h2>{c.ritualDescription}</h2></div></div><div className="tier-selector">{(['essential', 'complete', 'ritual'] as const).map((item) => <button key={item} onClick={() => setTier(item)} className={tier === item ? 'selected' : ''}><span>{t(`tiers.${item}`)}</span><small>{item === 'essential' ? '2–3' : item === 'complete' ? '4' : '5+'} products</small>{item === 'complete' && <i>{c.recommended}</i>}</button>)}</div><div className="ritual-layout"><div className="ritual-products">{products.map((product, index) => <RitualProduct key={product.id} product={product} answers={answers} index={index} />)}</div><aside className="ritual-summary"><span className="summary-eyebrow">{c.yourInvestment}</span><strong>{price}</strong><div className="summary-rule" /><ul><li><MoonStar className="h-4 w-4" /> {c.morning}</li><li><Sparkles className="h-4 w-4" /> {c.evening}</li><li><ShieldCheck className="h-4 w-4" /> {c.explainable}</li></ul><a href="https://www.carimoempire.com/shop/" target="_blank" rel="noreferrer" className="button-primary summary-cta"><ShoppingBag className="h-4 w-4" /><span>{c.officialBoutique}</span><ArrowRight className="rtl-flip h-4 w-4" /></a><button className="summary-restart" onClick={reset}>{c.beginAgain}</button></aside></div></section><section className="privilege-section"><div><span className="editorial-kicker"><span /> {c.privilege}</span><h2>{c.privilegeText}</h2></div><div className="privilege-grid"><Privilege icon={<LockKeyhole />} title={c.privateGuidance} text={t('trust.privateText')} /><Privilege icon={<ShieldCheck />} title={c.cosmeticOnly} text={t('trust.guidanceText')} /><Privilege icon={<WandSparkles />} title={c.explainable} text={t('trust.personalText')} /></div></section></main>;
}

function MetricCard({label, value, index}: {label: string; value: string; index: number}) { return <article className="metric-card"><span>{String(index + 1).padStart(2, '0')}</span><strong>{value}</strong><p>{label}</p></article>; }
function RitualProduct({product, answers, index}: {product: Product; answers: Answers; index: number}) { const locale = useLocale() as Locale; const c = copy[locale]; const t = useTranslations('results'); const price = new Intl.NumberFormat(locale, {style: 'currency', currency: 'EUR'}).format(product.price); return <article className="ritual-product"><div className="ritual-product-number"><span>{c.chapter}</span><strong>{String(index + 1).padStart(2, '0')}</strong></div><div className="ritual-product-visual"><ProductVisual accent={product.accent} initials={product.initials} imageUrl={product.imageUrl} compact /></div><div className="ritual-product-copy"><div className="product-meta"><span>{t(`steps.${product.step}`)}</span><strong>{price}</strong></div><h3>{product.name}</h3><span className="why-label">{c.whySelected}</span><p>{t('reason', {concern: t(`concerns.${answers.concern}`), climate: t(`climates.${answers.climate}`)})}</p><a href={product.url} target="_blank" rel="noreferrer">{t('viewProduct')} <ExternalLink className="h-4 w-4" /></a></div></article>; }
function Privilege({icon, title, text}: {icon: ReactNode; title: string; text: string}) { return <article><span>{icon}</span><h3>{title}</h3><p>{text}</p></article>; }
function Navigation({back, next, nextLabel, disabled = false}: {back: () => void; next: () => void; nextLabel: string; disabled?: boolean}) { const t = useTranslations('common'); return <div className="navigation-row"><button className="nav-back" onClick={back}><ArrowLeft className="rtl-flip h-4 w-4" /> {t('back')}</button><button className="button-primary" onClick={next} disabled={disabled}><span>{nextLabel}</span><ArrowRight className="rtl-flip h-4 w-4" /></button></div>; }
function Footer() { const locale = useLocale() as Locale; const disclaimer = locale === 'ar' ? 'إرشاد تجميلي فقط — وليس تشخيصاً طبياً' : locale === 'fr' ? 'Conseils cosmétiques uniquement — aucun diagnostic médical' : 'Cosmetic guidance only — no medical diagnosis'; return <footer className="site-footer"><div><BrandMark inverse /><span>{disclaimer}</span></div><a href="https://www.carimoempire.com/shop/" target="_blank" rel="noreferrer">carimoempire.com <ExternalLink className="h-3.5 w-3.5" /></a></footer>; }

export function SkinMatchDemo() {
  const [stage, setStage] = useState<Stage>('welcome');
  const [photo, setPhoto] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answers>(defaultAnswers);
  const [source, setSource] = useState('photo-and-questionnaire');
  useEffect(() => () => { if (photo?.startsWith('blob:')) URL.revokeObjectURL(photo); }, [photo]);
  function reset() { setStage('welcome'); setPhoto(null); setAnswers(defaultAnswers); setSource('photo-and-questionnaire'); }
  function skipToConsultation() { setPhoto(null); setStage('consultation'); }
  async function analyze() { setStage('atelier'); const started = Date.now(); try { const response = await fetch('/api/analyze', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({answers, hasPhoto: Boolean(photo)})}); const data = await response.json(); setSource(data.source || 'questionnaire-only'); } catch { setSource('questionnaire-only'); } const remaining = Math.max(0, 2600 - (Date.now() - started)); window.setTimeout(() => setStage('reveal'), remaining); }
  return <div className="luxury-app"><div className="ambient-grain" /><Header reset={reset} stage={stage} /><AnimatePresence mode="wait"><PageTransition stage={stage}>{stage === 'welcome' && <Welcome start={() => setStage('privacy')} skip={skipToConsultation} />}{stage === 'privacy' && <Privacy back={() => setStage('welcome')} next={() => setStage('portrait')} />}{stage === 'portrait' && <Portrait back={() => setStage('privacy')} next={() => setStage('consultation')} skip={skipToConsultation} photo={photo} setPhoto={setPhoto} />}{stage === 'consultation' && <Consultation answers={answers} setAnswers={setAnswers} back={() => setStage(photo ? 'portrait' : 'welcome')} next={analyze} />}{stage === 'atelier' && <Atelier hasPhoto={Boolean(photo)} />}{stage === 'reveal' && <Reveal answers={answers} reset={reset} source={source} />}</PageTransition></AnimatePresence>{stage !== 'atelier' && <Footer />}</div>;
}
