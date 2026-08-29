import React, { useState, useMemo } from "react";
import {
  Home, BookOpen, ListChecks, LineChart, User,
  ChevronRight, ChevronLeft, Search, CheckCircle2, Circle,
  Lightbulb, Stethoscope, ListTree, BookMarked, Sparkles, Flame,
  Bot, Send, Loader2,
} from "lucide-react";

/* ---------------------------- Design tokens ---------------------------- */
const INK = "#1C2B39";
const PARCH = "#F6F1E4";
const LINE = "#E4DCC7";
const MUTED = "#8A7F63";
const SERIF = "'Lora', serif";
const MONO = "'IBM Plex Mono', monospace";

/* ------------------------------ Content --------------------------------- */
const SUBJECTS = [
  {
    id: "anatomy",
    name: "Anatomy",
    color: "#B8432E",
    tint: "#F3DED9",
    label: "ANAT",
    totalChapters: 24,
    progress: 34,
    chapters: [
      {
        id: "a1",
        title: "Upper Limb",
        topics: [
          {
            id: "brachial-plexus",
            name: "Brachial Plexus",
            completed: true,
            simple: "The brachial plexus is the network of nerves that carries movement and sensation signals from the spinal cord to the entire arm.",
            detailed: "Formed by the ventral rami of C5–T1, the brachial plexus is organized into roots, trunks, divisions, cords, and branches (mnemonic: Real Teenagers Drink Cold Beer). The five terminal branches — musculocutaneous, axillary, radial, median, and ulnar nerves — arise from the cords and supply the muscles and skin of the entire upper limb. Injuries at different levels produce distinct patterns of weakness, which is why the plexus is a favorite topic for clinical correlation.",
            points: [
              "Roots: C5–T1 (ventral rami)",
              "Trunks: upper, middle, lower",
              "Divisions: anterior and posterior (6 total)",
              "Cords: lateral, posterior, medial — named by position relative to the axillary artery",
              "Terminal branches: musculocutaneous, axillary, radial, median, ulnar",
            ],
            clinical: "Erb's palsy (upper trunk, C5–C6) causes a 'waiter's tip' posture from a traction injury during difficult childbirth. Klumpke's palsy (lower trunk, C8–T1) causes a 'claw hand' and can involve Horner's syndrome.",
            mnemonic: "Roots, Trunks, Divisions, Cords, Branches — 'Real Teenagers Drink Cold Beer.'",
            terms: [
              { term: "Ventral rami", def: "The anterior branch of a spinal nerve, carrying motor and sensory fibers." },
              { term: "Erb's palsy", def: "Upper trunk injury causing arm adduction and internal rotation." },
              { term: "Klumpke's palsy", def: "Lower trunk injury causing intrinsic hand muscle weakness." },
            ],
          },
          {
            id: "shoulder-joint",
            name: "Shoulder Joint",
            completed: true,
            simple: "The shoulder is a ball-and-socket joint built for a huge range of motion, held together mostly by muscles rather than bone.",
            detailed: "The glenohumeral joint sits between the humeral head and the shallow glenoid fossa of the scapula, deepened slightly by the glenoid labrum. Because the socket is shallow, stability depends heavily on the rotator cuff muscles (supraspinatus, infraspinatus, teres minor, subscapularis) and the joint capsule and ligaments, trading bony stability for mobility.",
            points: [
              "Type: synovial ball-and-socket joint",
              "Stabilizers: rotator cuff (SITS muscles), glenoid labrum, joint capsule",
              "Most mobile joint in the body — also the most commonly dislocated",
              "Anterior dislocation is far more common than posterior",
            ],
            clinical: "Supraspinatus is the most commonly torn rotator cuff muscle, tested with the 'empty can' test. Anterior shoulder dislocation can stretch or injure the axillary nerve, causing loss of sensation over the 'regimental badge' area of the deltoid.",
            mnemonic: "Rotator cuff muscles — SITS: Supraspinatus, Infraspinatus, Teres minor, Subscapularis.",
            terms: [
              { term: "Glenoid labrum", def: "Fibrocartilage rim that deepens the glenoid fossa." },
              { term: "Rotator cuff", def: "Four muscles that stabilize and move the shoulder joint." },
            ],
          },
        ],
      },
      {
        id: "a2",
        title: "Cardiovascular System",
        topics: [
          {
            id: "heart-chambers-valves",
            name: "Heart Chambers & Valves",
            completed: false,
            simple: "The heart has four chambers and four valves that keep blood flowing in one direction.",
            detailed: "Deoxygenated blood enters the right atrium, passes through the tricuspid valve into the right ventricle, and is pumped through the pulmonary valve to the lungs. Oxygenated blood returns to the left atrium, crosses the mitral (bicuspid) valve into the left ventricle, and is ejected through the aortic valve to the body. The left ventricle has a much thicker wall than the right, reflecting the higher pressure needed to pump blood systemically.",
            points: [
              "Right side: tricuspid valve → right ventricle → pulmonary valve",
              "Left side: mitral valve → left ventricle → aortic valve",
              "AV valves (tricuspid, mitral) prevent backflow into the atria",
              "Semilunar valves (pulmonary, aortic) prevent backflow into the ventricles",
              "Left ventricular wall is roughly 3x thicker than the right",
            ],
            clinical: "Mitral valve prolapse can cause a mid-systolic click and late systolic murmur. Aortic stenosis produces a crescendo-decrescendo murmur radiating to the carotids, and is a common cause of exertional syncope in older adults.",
            mnemonic: "'Try Before You Buy' — Tricuspid, Bicuspid (mitral) for the AV valves, in order right then left.",
            terms: [
              { term: "AV valve", def: "Valve between atrium and ventricle (tricuspid, mitral)." },
              { term: "Semilunar valve", def: "Half-moon-shaped valve at the exit of each ventricle." },
            ],
          },
          {
            id: "great-vessels",
            name: "Great Vessels",
            completed: false,
            simple: "The great vessels are the large arteries and veins that connect directly to the heart.",
            detailed: "These include the superior and inferior vena cava (returning blood to the right atrium), the pulmonary trunk (carrying blood from the right ventricle to the lungs), the pulmonary veins (returning oxygenated blood to the left atrium), and the aorta (carrying blood from the left ventricle to the body). Their arrangement defines the heart's borders on a chest X-ray and is central to understanding congenital heart defects.",
            points: [
              "SVC and IVC drain into the right atrium",
              "Pulmonary trunk splits into left and right pulmonary arteries",
              "Four pulmonary veins drain into the left atrium",
              "Aorta arises from the left ventricle and arches over the pulmonary trunk",
            ],
            clinical: "Transposition of the great arteries, where the aorta and pulmonary trunk are swapped, creates two separate circulations and is incompatible with life without a shunt (e.g., patent ductus arteriosus) to mix blood.",
            terms: [
              { term: "SVC / IVC", def: "Superior and inferior vena cava — return systemic blood to the right atrium." },
              { term: "Pulmonary trunk", def: "Vessel carrying deoxygenated blood from the right ventricle to the lungs." },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "physiology",
    name: "Physiology",
    color: "#3B5B7A",
    tint: "#DCE4EC",
    label: "PHYS",
    totalChapters: 18,
    progress: 68,
    chapters: [
      {
        id: "p1",
        title: "Cardiovascular Physiology",
        topics: [
          {
            id: "cardiac-cycle",
            name: "Cardiac Cycle & Heart Sounds",
            completed: true,
            simple: "The cardiac cycle is one full heartbeat — the heart filling with blood, then squeezing it out, over and over.",
            detailed: "The cycle alternates between diastole (relaxation and filling) and systole (contraction and ejection). S1 marks the closure of the AV valves (tricuspid and mitral) at the start of systole. S2 marks the closure of the semilunar valves (aortic and pulmonary) at the start of diastole. The pressure-volume relationships in the ventricle during this cycle — isovolumetric contraction, ejection, isovolumetric relaxation, and filling — define how much blood the heart pumps per beat.",
            points: [
              "S1 = closure of AV valves (mitral, tricuspid) — 'lub'",
              "S2 = closure of semilunar valves (aortic, pulmonary) — 'dub'",
              "Isovolumetric contraction: all valves closed, pressure rises with no volume change",
              "Ejection phase: aortic/pulmonary valves open, blood is expelled",
              "Diastole makes up roughly two-thirds of the cardiac cycle at rest",
            ],
            clinical: "A split S2 that widens with inspiration is normal (physiologic splitting). A fixed split S2 that doesn't change with breathing suggests an atrial septal defect. S3 sounds can be normal in children but often indicate heart failure in adults.",
            mnemonic: "'Lub-Dub' — S1 (AV valves close, ventricles contract) then S2 (semilunar valves close, ventricles relax).",
            terms: [
              { term: "Systole", def: "The contraction phase of the cardiac cycle, when the heart ejects blood." },
              { term: "Diastole", def: "The relaxation phase, when the heart fills with blood." },
              { term: "S1 / S2", def: "First and second heart sounds, from AV and semilunar valve closure." },
            ],
          },
          {
            id: "cardiac-output",
            name: "Cardiac Output & Regulation",
            completed: false,
            simple: "Cardiac output is how much blood the heart pumps each minute — it depends on heart rate and how much blood is pumped per beat.",
            detailed: "Cardiac output (CO) = heart rate × stroke volume. Stroke volume is influenced by preload (Frank-Starling law — more stretch, more forceful contraction), afterload (the resistance the ventricle pumps against), and contractility (intrinsic strength of contraction, boosted by sympathetic stimulation). The autonomic nervous system fine-tunes both heart rate and contractility to match the body's changing demands.",
            points: [
              "CO = Heart Rate × Stroke Volume",
              "Frank-Starling law: increased venous return → increased stroke volume",
              "Preload ↑ generally increases stroke volume",
              "Afterload ↑ generally decreases stroke volume",
              "Sympathetic stimulation increases both heart rate and contractility",
            ],
            clinical: "In heart failure, the Frank-Starling curve shifts downward — the ventricle can't generate as much force for a given stretch, which is why increasing preload (e.g., with IV fluids) can sometimes worsen symptoms rather than help.",
            terms: [
              { term: "Preload", def: "The stretch on the ventricle before contraction, related to venous return." },
              { term: "Afterload", def: "The resistance the ventricle must overcome to eject blood." },
              { term: "Frank-Starling law", def: "Greater ventricular filling produces a stronger contraction, up to a point." },
            ],
          },
        ],
      },
      {
        id: "p2",
        title: "Renal Physiology",
        topics: [
          {
            id: "glomerular-filtration",
            name: "Glomerular Filtration",
            completed: false,
            simple: "The kidneys filter blood through tiny sieves called glomeruli, producing the fluid that will become urine.",
            detailed: "Blood enters the glomerulus through the afferent arteriole at relatively high pressure, forcing water and small solutes through the filtration barrier (fenestrated endothelium, basement membrane, podocytes) into Bowman's space. Cells and large proteins normally stay in the blood. The glomerular filtration rate (GFR) — roughly 125 mL/min in a healthy adult — is the key measure of overall kidney function.",
            points: [
              "Filtration barrier: endothelium, basement membrane, podocyte foot processes",
              "GFR is regulated by afferent and efferent arteriole tone",
              "Normal GFR ≈ 125 mL/min (≈ 180 L/day)",
              "Only ~1% of filtered fluid ends up as urine — the rest is reabsorbed",
            ],
            clinical: "Damage to the filtration barrier (e.g., in glomerulonephritis) lets protein and red blood cells leak into the urine — proteinuria and hematuria are classic clinical clues to glomerular disease.",
            terms: [
              { term: "GFR", def: "Glomerular filtration rate — volume filtered by the kidneys per minute." },
              { term: "Podocyte", def: "Specialized cell wrapping the glomerular capillaries, part of the filtration barrier." },
            ],
          },
          {
            id: "renal-tubular-transport",
            name: "Renal Tubular Transport",
            completed: false,
            simple: "After filtration, the kidney tubules reabsorb what the body needs and secrete what it doesn't, fine-tuning the final urine.",
            detailed: "The proximal tubule reabsorbs the bulk of filtered glucose, amino acids, and sodium. The loop of Henle establishes the concentration gradient in the medulla that allows the kidney to concentrate urine. The distal tubule and collecting duct fine-tune sodium, potassium, and water balance under hormonal control (aldosterone, ADH), determining the final composition of urine.",
            points: [
              "Proximal tubule: bulk reabsorption of glucose, amino acids, sodium, bicarbonate",
              "Loop of Henle: creates the medullary concentration gradient (countercurrent multiplication)",
              "Distal tubule/collecting duct: fine control via aldosterone (Na+/K+) and ADH (water)",
              "Glucose reabsorption has a transport maximum — above it, glucose spills into urine",
            ],
            clinical: "In uncontrolled diabetes, blood glucose exceeds the proximal tubule's reabsorption capacity, causing glucosuria — one reason for the classic symptoms of excess thirst and urination.",
            terms: [
              { term: "ADH", def: "Antidiuretic hormone — increases water reabsorption in the collecting duct." },
              { term: "Aldosterone", def: "Hormone that increases sodium reabsorption and potassium secretion." },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "biochemistry",
    name: "Medical Biochemistry",
    color: "#5C7A52",
    tint: "#E1E8DC",
    label: "BCHM",
    totalChapters: 21,
    progress: 21,
    chapters: [
      {
        id: "b1",
        title: "Carbohydrate Metabolism",
        topics: [
          {
            id: "glycolysis",
            name: "Glycolysis",
            completed: false,
            simple: "Glycolysis is how cells break down glucose into a smaller molecule called pyruvate, releasing a small amount of usable energy.",
            detailed: "Occurring in the cytoplasm, glycolysis converts one glucose molecule into two pyruvate molecules through ten enzymatic steps, netting 2 ATP and 2 NADH. It doesn't require oxygen, which is why it can run in tissues with limited oxygen supply. The pathway is tightly regulated at three irreversible steps, catalyzed by hexokinase, phosphofructokinase-1 (the key regulatory enzyme), and pyruvate kinase.",
            points: [
              "Occurs in the cytoplasm; doesn't require oxygen",
              "Net yield: 2 ATP and 2 NADH per glucose",
              "Key regulatory enzyme: phosphofructokinase-1 (PFK-1)",
              "Pyruvate can go on to the Krebs cycle (aerobic) or become lactate (anaerobic)",
            ],
            clinical: "Cancer cells often rely heavily on glycolysis even when oxygen is available (the Warburg effect), which is part of the basis for PET scans using radiolabeled glucose to detect tumors.",
            mnemonic: "PFK-1 is the pacemaker of glycolysis — think of it as the rate-limiting 'gatekeeper' step.",
            terms: [
              { term: "PFK-1", def: "Phosphofructokinase-1, the main regulatory enzyme of glycolysis." },
              { term: "Pyruvate", def: "The three-carbon end product of glycolysis." },
            ],
          },
          {
            id: "krebs-cycle",
            name: "Krebs Cycle (Citric Acid Cycle)",
            completed: false,
            simple: "The Krebs cycle is a loop of reactions in the mitochondria that extracts energy-carrying electrons from fuel molecules.",
            detailed: "Acetyl-CoA, derived from pyruvate, fats, or amino acids, enters the cycle by combining with oxaloacetate to form citrate. Over eight steps, the cycle releases carbon dioxide and generates NADH, FADH2, and a small amount of GTP/ATP directly, while regenerating oxaloacetate to keep the cycle turning. The NADH and FADH2 produced feed into the electron transport chain, where most ATP is actually generated.",
            points: [
              "Occurs in the mitochondrial matrix",
              "Per acetyl-CoA: 3 NADH, 1 FADH2, 1 GTP (or ATP), 2 CO2",
              "Regenerates oxaloacetate to accept the next acetyl-CoA",
              "Key regulatory enzyme: isocitrate dehydrogenase",
            ],
            clinical: "Arsenic poisoning inhibits pyruvate dehydrogenase, blocking entry into the Krebs cycle and causing energy failure in tissues with high metabolic demand, such as the brain and heart.",
            terms: [
              { term: "Acetyl-CoA", def: "The two-carbon molecule that feeds the Krebs cycle." },
              { term: "NADH / FADH2", def: "Electron carriers that deliver electrons to the electron transport chain." },
            ],
          },
        ],
      },
      {
        id: "b2",
        title: "Amino Acid Metabolism",
        topics: [
          {
            id: "urea-cycle",
            name: "Urea Cycle",
            completed: false,
            simple: "The urea cycle converts toxic ammonia, produced from breaking down amino acids, into urea so it can be safely excreted.",
            detailed: "Ammonia from amino acid breakdown is highly toxic, especially to the brain. The liver's urea cycle combines ammonia with carbon dioxide and aspartate over five main steps, spanning both the mitochondria and cytoplasm, to produce urea, which is water-soluble and excreted by the kidneys. The rate-limiting step is catalyzed by carbamoyl phosphate synthetase I.",
            points: [
              "Takes place primarily in the liver",
              "Spans mitochondria (first two steps) and cytoplasm (remaining steps)",
              "Rate-limiting enzyme: carbamoyl phosphate synthetase I",
              "End product urea is excreted by the kidneys",
            ],
            clinical: "Inherited deficiencies in urea cycle enzymes (e.g., ornithine transcarbamylase deficiency) cause ammonia to accumulate, leading to hyperammonemia, which can cause lethargy, vomiting, and if untreated, coma — a key reason newborns are screened for metabolic disorders.",
            terms: [
              { term: "Ammonia (NH3)", def: "A toxic byproduct of amino acid breakdown, especially harmful to the brain." },
              { term: "Hyperammonemia", def: "Elevated blood ammonia, often from a urea cycle defect." },
            ],
          },
          {
            id: "amino-acid-degradation",
            name: "Amino Acid Degradation",
            completed: false,
            simple: "When amino acids are broken down for energy, their nitrogen is removed first and their carbon backbones are funneled into other pathways.",
            detailed: "Amino acid degradation begins with removal of the amino group, usually via transamination to glutamate, followed by oxidative deamination to release free ammonia (which enters the urea cycle). The remaining carbon skeleton is converted into a metabolic intermediate — either glucogenic (can form glucose) or ketogenic (can form ketone bodies) — depending on the specific amino acid.",
            points: [
              "Transamination moves an amino group onto alpha-ketoglutarate to form glutamate",
              "Oxidative deamination releases free ammonia from glutamate",
              "Glucogenic amino acids feed into gluconeogenesis",
              "Ketogenic amino acids (leucine, lysine) feed into ketone body formation",
            ],
            clinical: "Phenylketonuria (PKU) results from a defect in phenylalanine hydroxylase, preventing conversion of phenylalanine to tyrosine. Untreated, it causes intellectual disability, which is why newborns are screened and placed on a phenylalanine-restricted diet if affected.",
            mnemonic: "Only leucine and lysine are purely ketogenic — 'the Ketogenic Twins, Leucine and Lysine.'",
            terms: [
              { term: "Transamination", def: "Transfer of an amino group from an amino acid to a keto acid." },
              { term: "Glucogenic", def: "Describes amino acids whose carbon skeleton can form glucose." },
            ],
          },
        ],
      },
    ],
  },
];

const STREAK = [1, 1, 1, 1, 1, 1, 0];
const STREAK_DAYS = ["M", "T", "W", "T", "F", "S", "S"];

/* ------------------------------ Small UI bits --------------------------- */
function Label({ children, color = MUTED }) {
  return (
    <p className="text-[10px] uppercase tracking-[0.16em]" style={{ color, fontFamily: MONO }}>
      {children}
    </p>
  );
}

function NavItem({ icon: Icon, label, active, onClick }) {
  return (
    <button className="flex flex-col items-center gap-1" onClick={onClick}>
      <Icon size={20} color={active ? "#B8432E" : "#A69C82"} strokeWidth={active ? 2.4 : 2} />
      <span className="text-[9.5px]" style={{ color: active ? "#B8432E" : "#A69C82", fontFamily: MONO }}>
        {label}
      </span>
    </button>
  );
}

function ProgressBar({ pct, color }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#0000000f" }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-[11px] tabular-nums" style={{ color, fontFamily: MONO }}>{pct}%</span>
    </div>
  );
}

function PulseLine() {
  const width = 320;
  const height = 56;
  const segW = width / STREAK.length;
  let d = `M0 ${height / 2}`;
  STREAK.forEach((studied, i) => {
    const x0 = i * segW;
    const mid = x0 + segW * 0.45;
    const x1 = x0 + segW;
    if (studied) {
      d += ` L${x0 + segW * 0.15} ${height / 2}`;
      d += ` L${mid - 6} ${height / 2}`;
      d += ` L${mid - 2} ${height * 0.12}`;
      d += ` L${mid + 3} ${height * 0.88}`;
      d += ` L${mid + 8} ${height / 2}`;
      d += ` L${x1} ${height / 2}`;
    } else {
      d += ` L${x1} ${height / 2}`;
    }
  });
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-14" preserveAspectRatio="none">
      <path d={d} fill="none" stroke="#B8432E" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

/* -------------------------------- HOME ------------------------------------ */
function HomeScreen({ onOpenSubject, onGoToStudy }) {
  const studentName = "Daniel";
  return (
    <div className="pb-28">
      <div className="px-5 pt-7 pb-5 border-b" style={{ borderColor: LINE }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] tracking-[0.18em] uppercase mb-1" style={{ color: MUTED, fontFamily: MONO }}>
              Study Chart · No. 0417
            </p>
            <h1 className="text-[26px] leading-tight" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>
              Good day, {studentName}
            </h1>
          </div>
          <div className="w-11 h-11 rounded-sm flex items-center justify-center border-2 shrink-0" style={{ borderColor: INK, color: INK, fontFamily: SERIF, fontWeight: 600 }}>
            D
          </div>
        </div>
      </div>

      <div className="px-5 pt-6 space-y-7">
        <section>
          <div className="flex items-center justify-between">
            <Label>Subjects</Label>
            <button onClick={onGoToStudy} className="text-[11px] uppercase tracking-wide" style={{ color: "#B8432E", fontFamily: MONO }}>
              See all
            </button>
          </div>
          <div className="space-y-2.5 mt-3">
            {SUBJECTS.map((s) => (
              <button
                key={s.name}
                onClick={() => onOpenSubject(s)}
                className="w-full flex items-center gap-3 pl-0 pr-4 py-3 bg-white rounded-sm border text-left"
                style={{ borderColor: LINE }}
              >
                <div className="w-1.5 self-stretch rounded-l-sm" style={{ background: s.color }} />
                <div className="w-10 h-10 rounded-sm flex items-center justify-center text-[10px] font-semibold shrink-0" style={{ background: s.tint, color: s.color, fontFamily: MONO }}>
                  {s.label}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] truncate" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>{s.name}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: MUTED, fontFamily: MONO }}>{s.totalChapters} chapters</p>
                </div>
                <ChevronRight size={16} color="#B3A889" />
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between">
            <Label>Continue Studying</Label>
            <button onClick={onGoToStudy} className="text-[11px] uppercase tracking-wide" style={{ color: "#B8432E", fontFamily: MONO }}>
              See all
            </button>
          </div>
          <button
            onClick={() => onOpenSubject(SUBJECTS[1])}
            className="mt-3 w-full text-left p-4 rounded-sm border-l-4"
            style={{ background: "#DCE4EC", borderColor: "#3B5B7A" }}
          >
            <p className="text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: "#3B5B7A", fontFamily: MONO }}>Physiology</p>
            <p className="text-[16px] leading-snug mb-1" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>Cardiac Cycle &amp; Heart Sounds</p>
            <p className="text-[12.5px] leading-relaxed mb-3" style={{ color: "#46586B" }}>
              Phases of the cardiac cycle and the clinical significance of S1 and S2 sounds.
            </p>
            <ProgressBar pct={68} color="#3B5B7A" />
          </button>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-sm bg-white border" style={{ borderColor: LINE }}>
            <Label>Today's Goal</Label>
            <p className="text-[28px] mt-2 leading-none" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>75%</p>
            <p className="text-[11.5px] mt-2" style={{ color: "#6B6047" }}>Almost there, {studentName}</p>
            <p className="text-[10.5px] mt-1" style={{ color: MUTED, fontFamily: MONO }}>3 of 4 modules</p>
          </div>
          <div className="p-4 rounded-sm bg-white border" style={{ borderColor: LINE }}>
            <div className="flex items-center gap-1.5">
              <Flame size={12} color="#B8432E" />
              <Label>Streak</Label>
            </div>
            <p className="text-[28px] mt-2 leading-none" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>
              12<span className="text-[13px] font-normal ml-1" style={{ color: MUTED }}>days</span>
            </p>
            <p className="text-[10.5px] mt-2" style={{ color: MUTED, fontFamily: MONO }}>Best: 18 days</p>
          </div>
        </section>

        <section className="p-4 rounded-sm bg-white border" style={{ borderColor: LINE }}>
          <Label>This Week</Label>
          <div className="mt-1"><PulseLine /></div>
          <div className="flex justify-between px-1">
            {STREAK_DAYS.map((d, i) => (
              <span key={i} className="text-[10px]" style={{ color: STREAK[i] ? INK : "#C3B99B", fontFamily: MONO }}>{d}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/* ------------------------------ STUDY: subject list ---------------------- */
function SubjectList({ onOpenSubject }) {
  return (
    <div className="px-5 pt-6 pb-28 space-y-4">
      <div>
        <h1 className="text-[24px] leading-tight" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>Study</h1>
        <p className="text-[12.5px] mt-1" style={{ color: MUTED }}>Choose a subject to continue.</p>
      </div>
      {SUBJECTS.map((s) => (
        <div key={s.id} className="bg-white rounded-sm border overflow-hidden" style={{ borderColor: LINE }}>
          <div className="flex items-stretch">
            <div className="w-1.5 shrink-0" style={{ background: s.color }} />
            <div className="flex-1 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[17px]" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>{s.name}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: MUTED, fontFamily: MONO }}>{s.totalChapters} chapters</p>
                </div>
                <div className="w-9 h-9 rounded-sm flex items-center justify-center text-[9px] font-semibold shrink-0" style={{ background: s.tint, color: s.color, fontFamily: MONO }}>
                  {s.label}
                </div>
              </div>
              <div className="mt-3"><ProgressBar pct={s.progress} color={s.color} /></div>
              <button
                onClick={() => onOpenSubject(s)}
                className="mt-3 w-full py-2.5 rounded-sm text-[12.5px] font-medium flex items-center justify-center gap-1.5"
                style={{ background: s.color, color: "#FFF" }}
              >
                Continue Studying
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------ STUDY: chapter list ----------------------- */
function SubjectDetail({ subject, onBack, onOpenTopic }) {
  const [query, setQuery] = useState("");

  const filteredTopics = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    const results = [];
    subject.chapters.forEach((ch) => {
      ch.topics.forEach((t) => {
        if (t.name.toLowerCase().includes(q) || ch.title.toLowerCase().includes(q)) {
          results.push({ ...t, chapterTitle: ch.title });
        }
      });
    });
    return results;
  }, [query, subject]);

  return (
    <div className="pb-28">
      <div className="px-5 pt-6 pb-3 sticky top-0 z-10" style={{ background: PARCH }}>
        <button onClick={onBack} className="flex items-center gap-1 mb-3" style={{ color: subject.color }}>
          <ChevronLeft size={16} />
          <span className="text-[12px]" style={{ fontFamily: MONO }}>Study</span>
        </button>
        <h1 className="text-[22px] leading-tight" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>{subject.name}</h1>
        <div className="mt-3 flex items-center gap-2 bg-white rounded-sm border px-3 py-2.5" style={{ borderColor: LINE }}>
          <Search size={15} color={MUTED} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics..."
            className="flex-1 bg-transparent outline-none text-[13px]"
            style={{ color: INK, fontFamily: "inherit" }}
          />
        </div>
      </div>

      <div className="px-5 mt-2 space-y-5">
        {filteredTopics ? (
          <div>
            <Label>{filteredTopics.length} result{filteredTopics.length !== 1 ? "s" : ""}</Label>
            <div className="mt-2 space-y-2">
              {filteredTopics.map((t) => (
                <TopicRow key={t.id} topic={t} subtitle={t.chapterTitle} color={subject.color} onClick={() => onOpenTopic(t)} />
              ))}
              {filteredTopics.length === 0 && (
                <p className="text-[12.5px] py-6 text-center" style={{ color: MUTED }}>No topics match "{query}".</p>
              )}
            </div>
          </div>
        ) : (
          subject.chapters.map((ch) => (
            <div key={ch.id}>
              <Label>{ch.title}</Label>
              <div className="mt-2 space-y-2">
                {ch.topics.map((t) => (
                  <TopicRow key={t.id} topic={t} color={subject.color} onClick={() => onOpenTopic(t)} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function TopicRow({ topic, subtitle, color, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 bg-white rounded-sm border px-3.5 py-3 text-left" style={{ borderColor: LINE }}>
      {topic.completed ? <CheckCircle2 size={18} color={color} className="shrink-0" /> : <Circle size={18} color="#C9C0A6" className="shrink-0" />}
      <div className="flex-1 min-w-0">
        <p className="text-[13.5px] truncate" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>{topic.name}</p>
        {subtitle && <p className="text-[10.5px] mt-0.5" style={{ color: MUTED, fontFamily: MONO }}>{subtitle}</p>}
      </div>
      <ChevronRight size={15} color="#B3A889" />
    </button>
  );
}

/* ------------------------------ AI Tutor panel (OpenAI) -------------------- */
function AiTutorPanel({ topicName, color, tint }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function ask() {
    const q = question.trim();
    if (!q || loading) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setQuestion("");
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, topicName }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setMessages((m) => [...m, { role: "ai", text: data.answer }]);
      }
    } catch (e) {
      setError("Couldn't reach the AI tutor. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="p-3.5 rounded-sm border" style={{ background: tint, borderColor: LINE }}>
      <div className="flex items-center gap-1.5 mb-2">
        <Bot size={14} color={color} />
        <Label color={color}>Ask AI Tutor</Label>
      </div>

      {messages.length > 0 && (
        <div className="space-y-2 mb-3 max-h-64 overflow-y-auto">
          {messages.map((m, i) => (
            <div
              key={i}
              className="text-[12.5px] leading-relaxed p-2.5 rounded-sm"
              style={{
                background: m.role === "user" ? "#FFFFFF" : "#FFFFFFAA",
                color: INK,
              }}
            >
              <span className="text-[9.5px] uppercase block mb-1" style={{ color: MUTED, fontFamily: MONO }}>
                {m.role === "user" ? "You" : "AI Tutor"}
              </span>
              {m.text}
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="text-[11.5px] mb-2" style={{ color: "#B8432E" }}>{error}</p>
      )}

      <div className="flex items-center gap-2 bg-white rounded-sm border px-3 py-2" style={{ borderColor: LINE }}>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") ask(); }}
          placeholder={`Ask about ${topicName}...`}
          className="flex-1 bg-transparent outline-none text-[13px]"
          style={{ color: INK, fontFamily: "inherit" }}
          disabled={loading}
        />
        <button onClick={ask} disabled={loading} className="shrink-0" style={{ color }}>
          {loading ? <Loader2 size={17} className="animate-spin" /> : <Send size={17} />}
        </button>
      </div>
    </section>
  );
}

/* ------------------------------ STUDY: topic detail ------------------------ */
function TopicDetail({ topic, subject, onBack }) {
  const sections = [
    { icon: Lightbulb, title: "Simple Explanation", body: topic.simple, type: "text" },
    { icon: BookMarked, title: "Detailed Explanation", body: topic.detailed, type: "text" },
    { icon: ListTree, title: "Important Points", body: topic.points, type: "list" },
    { icon: Stethoscope, title: "Clinical Relevance", body: topic.clinical, type: "text" },
  ];
  return (
    <div className="pb-28">
      <div className="px-5 pt-6 pb-4" style={{ borderBottom: `1px solid ${LINE}` }}>
        <button onClick={onBack} className="flex items-center gap-1 mb-3" style={{ color: subject.color }}>
          <ChevronLeft size={16} />
          <span className="text-[12px]" style={{ fontFamily: MONO }}>{subject.name}</span>
        </button>
        <Label color={subject.color}>{subject.name}</Label>
        <h1 className="text-[22px] leading-tight mt-1" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>{topic.name}</h1>
        {topic.completed && (
          <div className="flex items-center gap-1.5 mt-2">
            <CheckCircle2 size={14} color={subject.color} />
            <span className="text-[11px]" style={{ color: subject.color, fontFamily: MONO }}>Studied</span>
          </div>
        )}
      </div>

      <div className="px-5 mt-5 space-y-5">
        {sections.map((sec) => (
          <section key={sec.title}>
            <div className="flex items-center gap-1.5 mb-2">
              <sec.icon size={14} color={subject.color} />
              <Label color={subject.color}>{sec.title}</Label>
            </div>
            {sec.type === "text" ? (
              <p className="text-[13.5px] leading-relaxed" style={{ color: "#3A3226" }}>{sec.body}</p>
            ) : (
              <ul className="space-y-1.5">
                {sec.body.map((pt, i) => (
                  <li key={i} className="flex gap-2 text-[13.5px] leading-relaxed" style={{ color: "#3A3226" }}>
                    <span style={{ color: subject.color }}>—</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {topic.mnemonic && (
          <section className="p-3.5 rounded-sm" style={{ background: subject.tint }}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Sparkles size={14} color={subject.color} />
              <Label color={subject.color}>Mnemonic</Label>
            </div>
            <p className="text-[13.5px] leading-relaxed italic" style={{ color: INK }}>{topic.mnemonic}</p>
          </section>
        )}

        <section>
          <Label color={subject.color}>Key Terms</Label>
          <div className="mt-2 space-y-2.5">
            {topic.terms.map((t) => (
              <div key={t.term} className="pl-3" style={{ borderLeft: `2px solid ${LINE}` }}>
                <p className="text-[13px]" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>{t.term}</p>
                <p className="text-[12.5px] mt-0.5 leading-relaxed" style={{ color: "#5B5340" }}>{t.def}</p>
              </div>
            ))}
          </div>
        </section>

        <AiTutorPanel topicName={topic.name} color={subject.color} tint={subject.tint} />
      </div>
    </div>
  );
}

/* ------------------------------- Placeholder tab --------------------------- */
function PlaceholderTab({ name }) {
  return (
    <div className="px-5 pt-24 pb-28 text-center">
      <p className="text-[13px]" style={{ color: MUTED, fontFamily: MONO }}>
        The {name} tab hasn't been built yet — Home and Study are ready.
      </p>
    </div>
  );
}

/* --------------------------------- ROOT APP -------------------------------- */
export default function MedSphereApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [subject, setSubject] = useState(null);
  const [topic, setTopic] = useState(null);

  const goToStudyTab = () => { setActiveTab("study"); setSubject(null); setTopic(null); };
  const openSubjectFromAnywhere = (s) => { setActiveTab("study"); setSubject(s); setTopic(null); };
  const openTopic = (t) => setTopic(t);
  const backToSubjects = () => { setSubject(null); setTopic(null); };
  const backToChapters = () => setTopic(null);

  const changeTab = (tab) => {
    setActiveTab(tab);
    if (tab !== "study") { setSubject(null); setTopic(null); }
  };

  let content;
  if (activeTab === "home") {
    content = <HomeScreen onOpenSubject={openSubjectFromAnywhere} onGoToStudy={goToStudyTab} />;
  } else if (activeTab === "study") {
    content = topic ? (
      <TopicDetail topic={topic} subject={subject} onBack={backToChapters} />
    ) : subject ? (
      <SubjectDetail subject={subject} onBack={backToSubjects} onOpenTopic={openTopic} />
    ) : (
      <SubjectList onOpenSubject={(s) => { setSubject(s); setTopic(null); }} />
    );
  } else {
    content = <PlaceholderTab name={activeTab[0].toUpperCase() + activeTab.slice(1)} />;
  }

  return (
    <div className="min-h-screen w-full flex justify-center" style={{ background: "#EDE7D6" }}>
      <div className="w-full max-w-sm min-h-screen relative" style={{ background: PARCH, fontFamily: "'Inter', ui-sans-serif, system-ui" }}>
        {content}
        <div className="fixed bottom-0 w-full max-w-sm flex items-center justify-around py-3 border-t" style={{ background: PARCH, borderColor: LINE }}>
          <NavItem icon={Home} label="Home" active={activeTab === "home"} onClick={() => changeTab("home")} />
          <NavItem icon={BookOpen} label="Study" active={activeTab === "study"} onClick={() => changeTab("study")} />
          <NavItem icon={ListChecks} label="Quiz" active={activeTab === "quiz"} onClick={() => changeTab("quiz")} />
          <NavItem icon={LineChart} label="Progress" active={activeTab === "progress"} onClick={() => changeTab("progress")} />
          <NavItem icon={User} label="Profile" active={activeTab === "profile"} onClick={() => changeTab("profile")} />
        </div>
      </div>
    </div>
  );
}
