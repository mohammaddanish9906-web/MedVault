import React, { useState, useEffect } from 'react';
import {
  Home, BookOpen, FileQuestion, GraduationCap, MoreHorizontal,
  ChevronRight, ChevronLeft, ChevronDown, Check, X, Lightbulb,
  StickyNote, GitBranch, FileText, Stethoscope
} from 'lucide-react';

// ---------- Design tokens ----------
const COLORS = {
  ink: '#1C2321',
  paper: '#F4F6F5',
  red: '#A23B3B',
  redSoft: '#F3E4E2',
  blue: '#2E5266',
  blueSoft: '#E3EAEC',
  ochre: '#B8862E',
  ochreSoft: '#F5EBD6',
  green: '#3D7A4F',
  greenSoft: '#E6F0E8',
  grid: '#E4E8E5',
  muted: '#6B7573',
};
const disp = { fontFamily: "'Space Grotesk', system-ui, sans-serif" };
const mono = { fontFamily: "'JetBrains Mono', monospace" };

function useGoogleFonts() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@500;600&display=swap';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);
}

// ---------- Sample data (demo content — not sourced from real papers) ----------
const SUBJECTS = [
  { id: 'anatomy', name: 'Anatomy', hasContent: true },
  { id: 'physiology', name: 'Physiology', hasContent: true },
  { id: 'biochemistry', name: 'Biochemistry', hasContent: false },
  { id: 'pathology', name: 'Pathology', hasContent: true },
  { id: 'pharmacology', name: 'Pharmacology', hasContent: true },
  { id: 'medicine', name: 'Medicine', hasContent: true },
  { id: 'surgery', name: 'Surgery', hasContent: false },
  { id: 'obgyn', name: 'OBG', hasContent: false },
];

const PAPERS = {
  anatomy: [
    { year: '2024', term: 'Final Prof Part 1' },
    { year: '2023', term: 'Final Prof Part 1' },
    { year: '2022', term: 'Final Prof Part 1' },
  ],
  physiology: [
    { year: '2024', term: 'Second Prof' },
    { year: '2023', term: 'Second Prof' },
  ],
  pathology: [
    { year: '2024', term: 'Final Prof Part 2' },
    { year: '2023', term: 'Final Prof Part 2' },
  ],
  pharmacology: [
    { year: '2024', term: 'Third Prof' },
    { year: '2023', term: 'Third Prof' },
  ],
  medicine: [
    { year: '2024', term: 'Final Prof Part 2' },
    { year: '2023', term: 'Final Prof Part 2' },
  ],
};

const UNI_MCQS = [
  { id: 'u1', subject: 'anatomy', year: '2024', q: 'The recurrent laryngeal nerve is a branch of which cranial nerve?', options: ['Glossopharyngeal nerve', 'Vagus nerve', 'Hypoglossal nerve', 'Accessory nerve'], answer: 1, explanation: 'It branches from the vagus (CN X) and supplies all intrinsic laryngeal muscles except cricothyroid.' },
  { id: 'u2', subject: 'pathology', year: '2023', q: 'Reed-Sternberg cells are a characteristic finding in which condition?', options: ['Non-Hodgkin lymphoma', 'Multiple myeloma', 'Hodgkin lymphoma', 'Chronic lymphocytic leukemia'], answer: 2, explanation: 'Binucleate "owl-eye" Reed-Sternberg cells are the diagnostic hallmark of Hodgkin lymphoma.' },
  { id: 'u3', subject: 'pharmacology', year: '2024', q: 'Which drug is the treatment of choice for Torsades de Pointes?', options: ['Lidocaine', 'Amiodarone', 'Magnesium sulfate', 'Verapamil'], answer: 2, explanation: 'IV magnesium sulfate is first-line, regardless of serum magnesium level.' },
  { id: 'u4', subject: 'pathology', year: '2022', q: 'Psammoma bodies are most characteristic of which tumor?', options: ['Papillary thyroid carcinoma', 'Follicular thyroid carcinoma', 'Medullary thyroid carcinoma', 'Anaplastic thyroid carcinoma'], answer: 0, explanation: 'Also seen in serous ovarian tumors and meningiomas.' },
  { id: 'u5', subject: 'anatomy', year: '2023', q: 'Which laryngeal muscle is NOT supplied by the recurrent laryngeal nerve?', options: ['Posterior cricoarytenoid', 'Lateral cricoarytenoid', 'Cricothyroid', 'Thyroarytenoid'], answer: 2, explanation: 'Cricothyroid is the exception — supplied by the external laryngeal branch of the superior laryngeal nerve.' },
  { id: 'u6', subject: 'physiology', year: '2024', q: 'The Frank-Starling law states the force of ventricular contraction is directly proportional to:', options: ['Heart rate', 'End-diastolic volume (preload)', 'Afterload', 'Contractility'], answer: 1, explanation: 'Increased venous return stretches cardiac fibers, increasing contraction force up to a physiological limit.' },
  { id: 'u7', subject: 'physiology', year: '2023', q: 'The resting membrane potential of a typical neuron is best described as:', options: ['Determined mainly by Na+ permeability', 'Close to the K+ equilibrium potential', 'Equal to the Cl- equilibrium potential', 'Independent of ion permeability'], answer: 1, explanation: 'At rest the membrane is far more permeable to K+ than Na+, so resting potential sits close to Ek.' },
  { id: 'u8', subject: 'medicine', year: '2024', q: 'Sudden tearing chest pain radiating to the back with a widened mediastinum on X-ray suggests:', options: ['Acute MI', 'Aortic dissection', 'Pulmonary embolism', 'Pericarditis'], answer: 1, explanation: 'Tearing pain radiating to the back with a widened mediastinum is classic for aortic dissection.' },
  { id: 'u9', subject: 'medicine', year: '2023', q: 'The gold-standard imaging investigation to confirm pulmonary embolism is:', options: ['Chest X-ray', 'CT pulmonary angiography', 'D-dimer', 'ECG'], answer: 1, explanation: 'CTPA is the current gold standard; V/Q scanning is reserved for patients who cannot have contrast.' },
];

const NEET_MCQS = [
  { id: 'n1', year: '2024', q: 'A 55-year-old diabetic man has sudden chest pain. ECG shows ST elevation in leads II, III and aVF. Which artery is most likely occluded?', options: ['Left anterior descending', 'Left circumflex', 'Right coronary artery', 'Left main coronary artery'], answer: 2, explanation: 'Inferior MI (II, III, aVF) is most often due to RCA occlusion.', highYield: true },
  { id: 'n2', year: '2023', q: 'Anion gap metabolic acidosis is seen in all of the following EXCEPT:', options: ['Diabetic ketoacidosis', 'Renal tubular acidosis (type 1)', 'Lactic acidosis', 'Salicylate poisoning'], answer: 1, explanation: 'RTA causes a normal (hyperchloremic) anion gap acidosis.', highYield: true },
  { id: 'n3', year: '2022', q: 'A neonate develops jaundice within 24 hours of birth. Most likely cause?', options: ['Physiological jaundice', 'Breast milk jaundice', 'Hemolytic disease of the newborn', 'Neonatal hepatitis'], answer: 2, explanation: 'Jaundice in the first 24 hours is always pathological — think hemolysis/Rh incompatibility.', highYield: false },
  { id: 'n4', year: '2024', q: 'Which is the most common cause of nephrotic syndrome in adults?', options: ['Minimal change disease', 'Membranous nephropathy', 'IgA nephropathy', 'Post-streptococcal GN'], answer: 1, explanation: 'Membranous nephropathy is classic for adult-onset nephrotic syndrome; MCD dominates in children.', highYield: true },
  { id: 'n5', year: '2024', q: 'A young woman has amenorrhea, galactorrhea, and a pituitary mass on MRI. Which hormone is most likely elevated?', options: ['FSH', 'Prolactin', 'Growth hormone', 'ACTH'], answer: 1, explanation: 'Amenorrhea-galactorrhea with a pituitary mass is classic for a prolactin-secreting adenoma.', highYield: true },
  { id: 'n6', year: '2023', q: 'Which organism is the most common cause of community-acquired pneumonia in adults?', options: ['Streptococcus pneumoniae', 'Klebsiella pneumoniae', 'Mycoplasma pneumoniae', 'Staphylococcus aureus'], answer: 0, explanation: 'S. pneumoniae remains the leading cause of typical community-acquired pneumonia.', highYield: false },
  { id: 'n7', year: '2024', q: 'A primigravida at 32 weeks has severe headache, BP 160/110, and 3+ proteinuria, no seizures. Most likely diagnosis?', options: ['Chronic hypertension', 'Gestational hypertension', 'Severe preeclampsia', 'Eclampsia'], answer: 2, explanation: 'BP ≥160/110 with significant proteinuria after 20 weeks defines severe preeclampsia; eclampsia additionally requires seizures.', highYield: true },
];

const NOTES = [
  { id: 'note1', subject: 'pathology', title: 'Nephrotic Syndrome', content: [
    'Proteinuria >3.5 g/day + hypoalbuminemia + edema + hyperlipidemia',
    'Children: Minimal Change Disease is most common',
    'Adults: Membranous nephropathy is most common',
    'Complications: infection (loss of Ig), thrombosis (loss of antithrombin III)',
  ]},
  { id: 'note2', subject: 'pharmacology', title: 'Beta-Blockers: Quick Recap', content: [
    'Mechanism: competitive antagonism at β-adrenergic receptors',
    'Cardioselective (β1): Atenolol, Metoprolol, Bisoprolol',
    'Non-selective: Propranolol, Timolol, Nadolol',
    'Caution in: asthma/COPD, severe bradycardia, decompensated heart failure',
  ]},
  { id: 'note3', subject: 'medicine', title: 'Acute Coronary Syndrome: Quick Recap', content: [
    'STEMI: ST elevation + troponin rise → emergency reperfusion (PCI preferred)',
    'NSTEMI: troponin rise, no persistent ST elevation → risk-stratify',
    'Unstable angina: ischemic symptoms, no troponin rise',
    'Initial management (MONA-B): Morphine, Oxygen if hypoxic, Nitrates, Aspirin, Beta-blocker',
  ]},
  { id: 'note4', subject: 'physiology', title: 'Thyroid Function Tests: Quick Read', content: [
    'Primary hyperthyroidism: TSH low, Free T4/T3 high',
    'Primary hypothyroidism: TSH high, Free T4 low',
    'Subclinical hypothyroidism: TSH mildly high, Free T4 normal',
    'Secondary (pituitary) hypothyroidism: TSH low/normal, Free T4 low',
  ]},
];

const MNEMONICS = [
  { id: 'm1', title: 'MUDPILES', for: 'Causes of high anion gap metabolic acidosis', expansion: 'Methanol · Uremia · DKA · Propylene glycol/Paraldehyde · Isoniazid/Iron · Lactic acidosis · Ethylene glycol · Salicylates' },
  { id: 'm2', title: 'SOCRATES', for: 'Taking a pain history', expansion: 'Site · Onset · Character · Radiation · Associations · Time course · Exacerbating/relieving · Severity' },
  { id: 'm3', title: 'APGAR', for: 'Newborn assessment at birth', expansion: 'Appearance · Pulse · Grimace · Activity · Respiration' },
  { id: 'm4', title: 'Randy Travis Drinks Cold Beer', for: 'Brachial plexus, root to branch', expansion: 'Roots · Trunks · Divisions · Cords · Branches' },
  { id: 'm5', title: 'On Old Olympus Towering Top', for: 'The 12 cranial nerves, in order', expansion: 'Olfactory · Optic · Oculomotor · Trochlear · Trigeminal · Abducens · Facial · Vestibulocochlear · Glossopharyngeal · Vagus · Accessory · Hypoglossal' },
  { id: 'm6', title: 'MONA-B', for: 'Initial management of acute coronary syndrome', expansion: 'Morphine · Oxygen (if hypoxic) · Nitrates · Aspirin · Beta-blocker' },
  { id: 'm7', title: 'VINDICATE', for: 'Framework for differential diagnosis', expansion: 'Vascular · Infective/Inflammatory · Neoplastic · Degenerative/Deficiency · Intoxication/Iatrogenic · Congenital · Autoimmune/Allergic · Traumatic · Endocrine/Environmental' },
];

const DIAGRAMS = [
  {
    id: 'd1', title: 'Approach to Anemia', subtitle: 'By MCV classification', type: 'branch',
    steps: ['Low Hemoglobin', 'Check MCV'],
    branches: [
      { label: 'Low MCV', sub: '< 80 fl', causes: 'Iron deficiency, Thalassemia, Chronic disease' },
      { label: 'Normal MCV', sub: '80-100 fl', causes: 'Acute blood loss, Hemolysis, Early chronic disease' },
      { label: 'High MCV', sub: '> 100 fl', causes: 'B12/Folate deficiency, Hypothyroidism, Liver disease' },
    ],
  },
  { id: 'd2', title: 'Nephron Pathway', subtitle: 'Structure & flow of filtrate', type: 'chain', steps: ['Glomerulus', 'Proximal Tubule', 'Loop of Henle', 'Distal Tubule', 'Collecting Duct'] },
  {
    id: 'd3', title: 'Approach to Jaundice', subtitle: 'By site of pathology', type: 'branch',
    steps: ['Jaundice (↑ bilirubin)', 'Site of pathology?'],
    branches: [
      { label: 'Prehepatic', sub: 'Unconjugated ↑', causes: 'Hemolytic anemia, Gilbert syndrome' },
      { label: 'Hepatic', sub: 'Mixed pattern', causes: 'Hepatitis, Cirrhosis, Drug-induced' },
      { label: 'Posthepatic', sub: 'Conjugated ↑', causes: 'Gallstones, Pancreatic head mass' },
    ],
  },
];

const TAB_ACCENT = { home: COLORS.ink, papers: COLORS.blue, mcq: COLORS.blue, neetpg: COLORS.red, more: COLORS.ochre };

// ---------- Small components ----------
function Tag({ children, color, bg }) {
  return <span className="text-xs uppercase px-1.5 py-0.5 rounded inline-block" style={{ ...mono, color, backgroundColor: bg, letterSpacing: '0.03em' }}>{children}</span>;
}

function SectionHeading({ children, sub }) {
  return (
    <div className="mb-3">
      <h2 className="text-lg font-bold" style={{ ...disp, color: COLORS.ink }}>{children}</h2>
      {sub && <p className="text-sm mt-0.5" style={{ color: COLORS.muted }}>{sub}</p>}
    </div>
  );
}

function BackLink({ onClick, children }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1 font-semibold text-sm mb-3" style={{ color: COLORS.blue }}>
      <ChevronLeft size={16} /> {children}
    </button>
  );
}

function SectionCard({ icon: Icon, title, subtitle, onClick, accent, accentSoft }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 bg-white rounded pl-3.5 pr-3.5 py-3.5 text-left active:scale-95 transition-transform" style={{ borderLeft: `4px solid ${accent}` }}>
      <div className="w-10 h-10 rounded flex items-center justify-center shrink-0" style={{ backgroundColor: accentSoft }}>
        <Icon size={19} style={{ color: accent }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold" style={{ color: COLORS.ink }}>{title}</p>
        <p className="text-sm" style={{ color: COLORS.muted }}>{subtitle}</p>
      </div>
      <ChevronRight size={16} style={{ color: COLORS.grid }} className="shrink-0" />
    </button>
  );
}

function McqCard({ mcq, index, answer, onAnswer, onRetry, badge, tagLabel, accent, accentSoft }) {
  const isAnswered = !!answer;
  return (
    <div className="bg-white rounded p-4 mb-3" style={{ borderLeft: `4px solid ${accent}` }}>
      <div className="flex items-center gap-2 mb-2.5 flex-wrap">
        <Tag color={accent} bg={accentSoft}>Q{String(index + 1).padStart(2, '0')}</Tag>
        {tagLabel && <Tag color={COLORS.muted} bg={COLORS.grid}>{tagLabel}</Tag>}
        {badge && <Tag color={COLORS.ochre} bg={COLORS.ochreSoft}>High Yield</Tag>}
      </div>
      <p className="font-medium mb-3 leading-snug" style={{ color: COLORS.ink }}>{mcq.q}</p>
      <div className="space-y-2">
        {mcq.options.map((opt, i) => {
          let borderColor = COLORS.grid, bgColor = '#FFFFFF', textColor = COLORS.ink, weight = 400, icon = null;
          if (isAnswered) {
            if (i === mcq.answer) { borderColor = COLORS.green; bgColor = COLORS.greenSoft; textColor = COLORS.green; weight = 600; icon = 'check'; }
            else if (i === answer.selected) { borderColor = COLORS.red; bgColor = COLORS.redSoft; textColor = COLORS.red; weight = 600; icon = 'x'; }
            else { textColor = COLORS.muted; }
          }
          return (
            <button key={i} disabled={isAnswered} onClick={() => !isAnswered && onAnswer(i)} className="w-full text-sm rounded px-3 py-2 flex items-center justify-between border text-left" style={{ borderColor, backgroundColor: bgColor, color: textColor, fontWeight: weight }}>
              <span>{opt}</span>
              {icon === 'check' && <Check size={15} style={{ color: COLORS.green }} className="shrink-0" />}
              {icon === 'x' && <X size={15} style={{ color: COLORS.red }} className="shrink-0" />}
            </button>
          );
        })}
      </div>
      {isAnswered && (
        <>
          <p className="text-sm mt-3 pt-3 border-t" style={{ color: COLORS.muted, borderColor: COLORS.grid }}>{mcq.explanation}</p>
          <button onClick={onRetry} className="text-xs font-semibold mt-2" style={{ color: COLORS.muted }}>↺ Try again</button>
        </>
      )}
    </div>
  );
}

function FlowBox({ children }) {
  return <div className="bg-white rounded px-3 py-2 text-center text-sm font-medium" style={{ border: `2px solid ${COLORS.blue}`, color: COLORS.ink }}>{children}</div>;
}

function BranchFlow({ steps, branches }) {
  return (
    <div className="space-y-2">
      {steps.map((s, i) => (
        <div key={i}>
          <FlowBox>{s}</FlowBox>
          <div className="flex justify-center py-1"><ChevronDown size={16} style={{ color: COLORS.blue }} /></div>
        </div>
      ))}
      <div className="grid grid-cols-3 gap-2">
        {branches.map((b, i) => (
          <div key={i} className="space-y-1.5">
            <div className="rounded px-1.5 py-2 text-center" style={{ backgroundColor: COLORS.blueSoft, border: `2px solid ${COLORS.blue}` }}>
              <p className="text-xs font-bold leading-tight" style={{ color: COLORS.ink }}>{b.label}</p>
              <p className="text-xs" style={{ color: COLORS.muted }}>{b.sub}</p>
            </div>
            <p className="text-xs text-center leading-tight" style={{ color: COLORS.muted }}>{b.causes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChainFlow({ steps }) {
  return (
    <div className="space-y-2">
      {steps.map((s, i) => (
        <div key={i}>
          <FlowBox>{s}</FlowBox>
          {i < steps.length - 1 && <div className="flex justify-center py-1"><ChevronDown size={16} style={{ color: COLORS.blue }} /></div>}
        </div>
      ))}
    </div>
  );
}

function NavIcon({ icon: Icon, label, active, onClick, accent }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center justify-center gap-1 flex-1 py-2.5">
      <Icon size={20} strokeWidth={active ? 2.5 : 1.8} color={active ? COLORS.ink : COLORS.muted} />
      <span className="text-xs" style={{ color: active ? COLORS.ink : COLORS.muted, fontWeight: active ? 600 : 500 }}>{label}</span>
      <div className="h-0.5 w-5 rounded-full" style={{ backgroundColor: active ? accent : 'transparent' }} />
    </button>
  );
}

function BottomNav({ tab, onNavigate }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t z-10" style={{ borderColor: COLORS.grid }}>
      <div className="max-w-md mx-auto flex">
        <NavIcon icon={Home} label="Home" active={tab === 'home'} accent={TAB_ACCENT.home} onClick={() => onNavigate('home')} />
        <NavIcon icon={BookOpen} label="Papers" active={tab === 'papers'} accent={TAB_ACCENT.papers} onClick={() => onNavigate('papers')} />
        <NavIcon icon={FileQuestion} label="MCQs" active={tab === 'mcq'} accent={TAB_ACCENT.mcq} onClick={() => onNavigate('mcq')} />
        <NavIcon icon={GraduationCap} label="NEET PG" active={tab === 'neetpg'} accent={TAB_ACCENT.neetpg} onClick={() => onNavigate('neetpg')} />
        <NavIcon icon={MoreHorizontal} label="More" active={tab === 'more'} accent={TAB_ACCENT.more} onClick={() => onNavigate('more')} />
      </div>
    </nav>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white border-b" style={{ borderColor: COLORS.grid }}>
      <div className="max-w-md mx-auto flex items-center gap-2.5 px-4 py-3.5">
        <div className="w-8 h-8 rounded flex items-center justify-center shrink-0" style={{ backgroundColor: COLORS.ink }}>
          <Stethoscope size={16} color={COLORS.paper} />
        </div>
        <div>
          <p className="font-bold leading-none" style={{ ...disp, color: COLORS.ink, fontSize: '17px' }}>MedPrep</p>
          <p className="text-xs uppercase mt-1" style={{ ...mono, color: COLORS.muted, letterSpacing: '0.05em' }}>Exam Record System</p>
        </div>
      </div>
    </header>
  );
}

// ---------- Views ----------
function HomeView({ go, progress }) {
  const attempted = Object.keys(progress).length;
  const correct = Object.values(progress).filter(p => p.correct).length;
  return (
    <div className="space-y-2.5">
      <div className="mb-1">
        <p className="text-sm" style={{ color: COLORS.muted }}>Welcome back</p>
        <h1 className="text-xl font-bold" style={{ ...disp, color: COLORS.ink }}>What are we studying today?</h1>
      </div>
      {attempted > 0 && (
        <div className="bg-white rounded p-3.5 flex items-center justify-between" style={{ borderLeft: `4px solid ${COLORS.green}` }}>
          <div>
            <p className="text-xs uppercase" style={{ ...mono, color: COLORS.muted, letterSpacing: '0.03em' }}>Your progress</p>
            <p className="font-semibold" style={{ color: COLORS.ink }}>{attempted} question{attempted === 1 ? '' : 's'} attempted</p>
          </div>
          <p className="text-lg font-bold" style={{ ...disp, color: COLORS.green }}>{Math.round((correct / attempted) * 100)}%</p>
        </div>
      )}
      <SectionCard icon={BookOpen} title="Previous Year Papers" subtitle="University exams, by subject" onClick={() => go('papers')} accent={COLORS.blue} accentSoft={COLORS.blueSoft} />
      <SectionCard icon={FileQuestion} title="MCQ Bank" subtitle="PYQs from university exams" onClick={() => go('mcq')} accent={COLORS.blue} accentSoft={COLORS.blueSoft} />
      <SectionCard icon={GraduationCap} title="NEET PG Prep" subtitle="Previously asked NEET PG MCQs" onClick={() => go('neetpg')} accent={COLORS.red} accentSoft={COLORS.redSoft} />
      <SectionCard icon={StickyNote} title="Short Notes" subtitle="Quick, exam-focused summaries" onClick={() => go('more', 'notes')} accent={COLORS.ink} accentSoft={COLORS.grid} />
      <SectionCard icon={Lightbulb} title="Mnemonics" subtitle="Easy recall for tough lists" onClick={() => go('more', 'mnemonics')} accent={COLORS.ochre} accentSoft={COLORS.ochreSoft} />
      <SectionCard icon={GitBranch} title="Diagrams & Flowcharts" subtitle="Visual, image-based learning" onClick={() => go('more', 'diagrams')} accent={COLORS.blue} accentSoft={COLORS.blueSoft} />
    </div>
  );
}

function PapersView({ subject, setSubject }) {
  if (subject) {
    const list = PAPERS[subject.id] || [];
    return (
      <div>
        <BackLink onClick={() => setSubject(null)}>All subjects</BackLink>
        <SectionHeading>{subject.name} — Papers</SectionHeading>
        <div className="space-y-2">
          {list.map((p, i) => (
            <div key={i} className="bg-white rounded p-4 flex items-center justify-between" style={{ borderLeft: `4px solid ${COLORS.blue}` }}>
              <div>
                <Tag color={COLORS.blue} bg={COLORS.blueSoft}>PYQ · {p.year}</Tag>
                <p className="text-sm mt-1.5" style={{ color: COLORS.muted }}>{p.term}</p>
              </div>
              <FileText size={19} style={{ color: COLORS.blue }} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div>
      <SectionHeading>Previous Year Papers</SectionHeading>
      <div className="grid grid-cols-2 gap-2.5">
        {SUBJECTS.map(s => (
          <button key={s.id} onClick={() => s.hasContent && setSubject(s)} className="rounded p-3.5 text-left bg-white" style={{ borderLeft: `4px solid ${s.hasContent ? COLORS.blue : COLORS.grid}`, opacity: s.hasContent ? 1 : 0.55 }}>
            <p className="font-semibold text-sm" style={{ color: COLORS.ink }}>{s.name}</p>
            <p className="text-xs mt-1" style={{ ...mono, color: COLORS.muted }}>{s.hasContent ? `${(PAPERS[s.id] || []).length} PAPERS` : 'SOON'}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function McqBankView({ mcqs, progress, onAnswer, onRetry, title, subtitleLabel, filterable, subjectFilter, setSubjectFilter, hyToggle, hyOnly, setHyOnly, accent, accentSoft }) {
  const subjectsWithMcqs = filterable ? [...new Set(mcqs.map(m => m.subject))] : [];
  let filtered = mcqs;
  if (filterable && subjectFilter !== 'all') filtered = filtered.filter(m => m.subject === subjectFilter);
  if (hyToggle && hyOnly) filtered = filtered.filter(m => m.highYield);
  const attempted = filtered.filter(m => progress[m.id]).length;
  const correct = filtered.filter(m => progress[m.id] && progress[m.id].correct).length;
  return (
    <div>
      <SectionHeading sub={subtitleLabel}>{title}</SectionHeading>
      {attempted > 0 && (
        <div className="flex items-center gap-2 mb-3 text-xs" style={{ ...mono, color: COLORS.muted }}>
          <span>{attempted}/{filtered.length} ATTEMPTED</span><span>·</span><span>{correct}/{attempted} CORRECT</span>
        </div>
      )}
      {filterable && (
        <div className="flex gap-2 overflow-x-auto pb-1 mb-3">
          <button onClick={() => setSubjectFilter('all')} className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full" style={subjectFilter === 'all' ? { backgroundColor: accent, color: '#fff' } : { backgroundColor: '#fff', color: COLORS.muted, border: `1px solid ${COLORS.grid}` }}>All</button>
          {subjectsWithMcqs.map(sid => {
            const s = SUBJECTS.find(x => x.id === sid);
            const on = subjectFilter === sid;
            return <button key={sid} onClick={() => setSubjectFilter(sid)} className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full" style={on ? { backgroundColor: accent, color: '#fff' } : { backgroundColor: '#fff', color: COLORS.muted, border: `1px solid ${COLORS.grid}` }}>{s ? s.name : sid}</button>;
          })}
        </div>
      )}
      {hyToggle && (
        <div className="mb-3">
          <button onClick={() => setHyOnly(!hyOnly)} className="text-xs font-semibold px-3 py-1.5 rounded-full" style={hyOnly ? { backgroundColor: accent, color: '#fff' } : { backgroundColor: '#fff', color: COLORS.muted, border: `1px solid ${COLORS.grid}` }}>{hyOnly ? '✓ High Yield Only' : 'High Yield Only'}</button>
        </div>
      )}
      {filtered.map((mcq, i) => (
        <McqCard key={mcq.id} mcq={mcq} index={i} answer={progress[mcq.id]} onAnswer={(sel) => onAnswer(mcq.id, sel)} onRetry={() => onRetry(mcq.id)} badge={mcq.highYield} tagLabel={`PYQ · ${mcq.year}`} accent={accent} accentSoft={accentSoft} />
      ))}
    </div>
  );
}

function MoreView({ onSelect }) {
  return (
    <div className="space-y-2.5">
      <SectionHeading>Study Tools</SectionHeading>
      <SectionCard icon={StickyNote} title="Short Notes" subtitle="Quick, exam-focused summaries" onClick={() => onSelect('notes')} accent={COLORS.ink} accentSoft={COLORS.grid} />
      <SectionCard icon={Lightbulb} title="Mnemonics" subtitle="Easy recall for tough lists" onClick={() => onSelect('mnemonics')} accent={COLORS.ochre} accentSoft={COLORS.ochreSoft} />
      <SectionCard icon={GitBranch} title="Diagrams & Flowcharts" subtitle="Visual, image-based learning" onClick={() => onSelect('diagrams')} accent={COLORS.blue} accentSoft={COLORS.blueSoft} />
    </div>
  );
}

function NotesView({ note, setNote }) {
  if (note) {
    return (
      <div>
        <BackLink onClick={() => setNote(null)}>All notes</BackLink>
        <SectionHeading>{note.title}</SectionHeading>
        <div className="bg-white rounded p-4 space-y-2.5" style={{ borderLeft: `4px solid ${COLORS.ink}` }}>
          {note.content.map((line, i) => <p key={i} className="text-sm flex gap-2" style={{ color: COLORS.ink }}><span style={{ color: COLORS.muted }}>—</span>{line}</p>)}
        </div>
      </div>
    );
  }
  return (
    <div>
      <SectionHeading>Short Notes</SectionHeading>
      <div className="space-y-2">
        {NOTES.map(n => (
          <button key={n.id} onClick={() => setNote(n)} className="w-full bg-white rounded p-4 text-left flex items-center justify-between" style={{ borderLeft: `4px solid ${COLORS.ink}` }}>
            <div>
              <p className="font-semibold" style={{ color: COLORS.ink }}>{n.title}</p>
              <p className="text-xs mt-0.5 uppercase" style={{ ...mono, color: COLORS.muted }}>{n.subject}</p>
            </div>
            <ChevronRight size={16} style={{ color: COLORS.grid }} />
          </button>
        ))}
      </div>
    </div>
  );
}

function MnemonicsView() {
  const [open, setOpen] = useState(null);
  return (
    <div>
      <SectionHeading>Mnemonics</SectionHeading>
      <div className="space-y-2">
        {MNEMONICS.map(m => (
          <div key={m.id} className="bg-white rounded p-4" style={{ borderLeft: `4px solid ${COLORS.ochre}` }}>
            <button onClick={() => setOpen(open === m.id ? null : m.id)} className="w-full flex items-center justify-between text-left">
              <div>
                <p className="font-bold" style={{ ...disp, color: COLORS.ochre }}>{m.title}</p>
                <p className="text-xs mt-0.5" style={{ color: COLORS.muted }}>{m.for}</p>
              </div>
              <ChevronDown size={16} style={{ color: COLORS.grid, transform: open === m.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} className="shrink-0" />
            </button>
            {open === m.id && <p className="text-sm mt-3 pt-3 border-t" style={{ color: COLORS.ink, borderColor: COLORS.grid }}>{m.expansion}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function DiagramsView({ diagram, setDiagram }) {
  if (diagram) {
    return (
      <div>
        <BackLink onClick={() => setDiagram(null)}>All diagrams</BackLink>
        <SectionHeading sub={diagram.subtitle}>{diagram.title}</SectionHeading>
        <div className="bg-white rounded p-4" style={{ borderLeft: `4px solid ${COLORS.blue}` }}>
          {diagram.type === 'branch' ? <BranchFlow steps={diagram.steps} branches={diagram.branches} /> : <ChainFlow steps={diagram.steps} />}
        </div>
      </div>
    );
  }
  return (
    <div>
      <SectionHeading>Diagrams & Flowcharts</SectionHeading>
      <div className="space-y-2">
        {DIAGRAMS.map(d => (
          <button key={d.id} onClick={() => setDiagram(d)} className="w-full bg-white rounded p-4 text-left flex items-center justify-between" style={{ borderLeft: `4px solid ${COLORS.blue}` }}>
            <div>
              <p className="font-semibold" style={{ color: COLORS.ink }}>{d.title}</p>
              <p className="text-xs mt-0.5" style={{ color: COLORS.muted }}>{d.subtitle}</p>
            </div>
            <GitBranch size={18} style={{ color: COLORS.blue }} />
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------- App ----------
export default function App() {
  useGoogleFonts();
  const [tab, setTab] = useState('home');
  const [moreSub, setMoreSub] = useState(null);
  const [paperSubject, setPaperSubject] = useState(null);
  const [note, setNote] = useState(null);
  const [diagram, setDiagram] = useState(null);
  const [uniFilter, setUniFilter] = useState('all');
  const [hyOnly, setHyOnly] = useState(false);
  const [progress, setProgress] = useState({});
const [adminMode, setAdminMode] = useState(false);
const [showAdmin, setShowAdmin] = useState(false);  useEffect(() => {
    try {
      const saved = localStorage.getItem('mcq-progress');
      if (saved) setProgress(JSON.parse(saved));
    } catch (e) {
      // no saved progress yet — start empty
    }
  }, []);

  const allMcqs = [...UNI_MCQS, ...NEET_MCQS];

  const handleAnswer = (mcqId, selectedIndex) => {
    const mcq = allMcqs.find(m => m.id === mcqId);
    if (!mcq) return;
    const updated = { ...progress, [mcqId]: { selected: selectedIndex, correct: selectedIndex === mcq.answer } };
    setProgress(updated);
    try { localStorage.setItem('mcq-progress', JSON.stringify(updated)); } catch (e) { /* saved locally in state even if persistence fails */ }
  };

  const handleRetry = (mcqId) => {
    const updated = { ...progress };
    delete updated[mcqId];
    setProgress(updated);
    try { localStorage.setItem('mcq-progress', JSON.stringify(updated)); } catch (e) { /* ignore */ }
  };

  const go = (t, sub) => { setTab(t); if (t === 'more') setMoreSub(sub || null); };
  const changeTab = (t) => { setTab(t); setMoreSub(null); setNote(null); setDiagram(null); setPaperSubject(null); };

  return (
    <div className="min-h-screen flex flex-col" style={{
      backgroundColor: COLORS.paper,
      backgroundImage: `linear-gradient(${COLORS.grid} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.grid} 1px, transparent 1px)`,
      backgroundSize: '22px 22px',
      fontFamily: "system-ui, -apple-system, sans-serif",
    }}>
      <Header />
      <main className="flex-1 px-4 pt-4 pb-24 max-w-md mx-auto w-full">
        {tab === 'home' && <HomeView go={go} progress={progress} />}
        {tab === 'papers' && <PapersView subject={paperSubject} setSubject={setPaperSubject} />}
        {tab === 'mcq' && <McqBankView mcqs={UNI_MCQS} progress={progress} onAnswer={handleAnswer} onRetry={handleRetry} title="MCQ Bank" subtitleLabel="Previously asked in university exams" filterable subjectFilter={uniFilter} setSubjectFilter={setUniFilter} accent={COLORS.blue} accentSoft={COLORS.blueSoft} />}
        {tab === 'neetpg' && <McqBankView mcqs={NEET_MCQS} progress={progress} onAnswer={handleAnswer} onRetry={handleRetry} title="NEET PG Prep" subtitleLabel="Previously asked NEET PG questions" filterable={false} hyToggle hyOnly={hyOnly} setHyOnly={setHyOnly} accent={COLORS.red} accentSoft={COLORS.redSoft} />}
        {tab === 'more' && !moreSub && <MoreView onSelect={setMoreSub} />}
        {tab === 'more' && moreSub === 'notes' && <NotesView note={note} setNote={setNote} />}
        {tab === 'more' && moreSub === 'mnemonics' && <MnemonicsView />}
        {tab === 'more' && moreSub === 'diagrams' && <DiagramsView diagram={diagram} setDiagram={setDiagram} />}
      </main>
{adminMode && (
  <button
    onClick={() => setShowAdmin(!showAdmin)}
    style={{
      position: 'fixed',
      right: 20,
      bottom: 90,
      background: '#A23B3B',
      color: 'white',
      border: 'none',
      borderRadius: 12,
      padding: '10px 16px',
      zIndex: 9999
    }}
  >
    Admin
  </button>
)}
      <BottomNav tab={tab} onNavigate={changeTab} />
    </div>
  );
}
