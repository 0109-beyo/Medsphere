import React, { useState, useMemo } from "react";
import {
  Home, BookOpen, ListChecks, LineChart, User,
  ChevronRight, ChevronLeft, Search, CheckCircle2, Circle,
  Lightbulb, Stethoscope, ListTree, BookMarked, Sparkles, Flame,
  Bot, Send, Loader2, X, Check, RotateCcw, Trophy,
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
            funFact: "The brachial plexus can be numbed with a single injection (a 'brachial plexus block'), allowing an entire arm surgery without general anesthesia.",
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
            funFact: "The shoulder can dislocate in almost any direction — the trade-off for having the largest range of motion of any joint in the body.",
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
            funFact: "Heart valve leaflets have no blood vessels of their own — they get oxygen and nutrients directly from the blood flowing past them.",
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
            funFact: "The aorta, the body's largest artery, is roughly the width of a garden hose where it exits the heart.",
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
      {
        id: "a3",
        title: "Lower Limb",
        topics: [
          {
            id: "hip-joint",
            funFact: "During running, the hip joint can bear forces several times a person's entire body weight with every stride.",
            name: "Hip Joint",
            completed: false,
            simple: "The hip is a deep, stable ball-and-socket joint that supports body weight while still allowing a wide range of leg movement.",
            detailed: "The hip joint sits between the femoral head and the acetabulum of the pelvis. Unlike the shallow shoulder socket, the acetabulum is deep and further deepened by the acetabular labrum, giving the hip much greater inherent bony stability than the shoulder — at the cost of somewhat reduced mobility. Strong ligaments (iliofemoral, pubofemoral, ischiofemoral) reinforce the capsule, and the blood supply to the femoral head runs largely through vessels vulnerable to disruption in fracture.",
            points: [
              "Type: synovial ball-and-socket joint, much deeper socket than the shoulder",
              "Acetabular labrum deepens the socket and improves stability",
              "Reinforced by the iliofemoral, pubofemoral, and ischiofemoral ligaments",
              "Blood supply to the femoral head is vulnerable in femoral neck fractures",
            ],
            clinical: "Femoral neck fractures can disrupt the retinacular blood supply to the femoral head, risking avascular necrosis — a key reason elderly patients with these fractures often need joint replacement rather than simple fixation.",
            mnemonic: "The hip trades mobility for stability compared to the shoulder — deep socket, strong ligaments, fewer dislocations.",
            terms: [
              { term: "Acetabulum", def: "The deep socket in the pelvis that receives the femoral head." },
              { term: "Avascular necrosis", def: "Bone death from disrupted blood supply, a risk after femoral neck fracture." },
            ],
          },
          {
            id: "femoral-sciatic-nerves",
            funFact: "The sciatic nerve is roughly as thick as a thumb — it's the widest single nerve in the human body.",
            name: "Femoral & Sciatic Nerves",
            completed: false,
            simple: "The femoral and sciatic nerves are the two major nerves that control movement and sensation in the leg.",
            detailed: "The femoral nerve arises from the lumbar plexus (L2–L4) and supplies the anterior thigh muscles (knee extension) along with sensation over the anterior thigh and medial leg. The sciatic nerve, the largest nerve in the body, arises from the lumbosacral plexus (L4–S3), runs down the posterior thigh, and splits into the tibial and common fibular (peroneal) nerves near the knee, supplying most of the leg and foot.",
            points: [
              "Femoral nerve: L2–L4, supplies the quadriceps (knee extension)",
              "Sciatic nerve: L4–S3, the largest nerve in the body",
              "Sciatic nerve splits into tibial and common fibular nerves near the popliteal fossa",
              "Common fibular nerve injury causes foot drop",
            ],
            clinical: "Common fibular (peroneal) nerve injury, often from trauma near the fibular neck, causes foot drop due to loss of ankle dorsiflexion. Sciatica describes pain radiating along the sciatic nerve distribution, often from lumbar disc herniation.",
            terms: [
              { term: "Foot drop", def: "Inability to dorsiflex the foot, classically from common fibular nerve injury." },
              { term: "Sciatica", def: "Pain radiating along the sciatic nerve, often due to nerve root compression." },
            ],
          },
        ],
      },
      {
        id: "a4",
        title: "Back",
        topics: [
          {
            id: "vertebral-column",
            funFact: "Humans are born with 33 vertebrae, but by adulthood we effectively have 26 movable bones, since the sacral and coccygeal vertebrae fuse together.",
            name: "Vertebral Column",
            completed: false,
            simple: "The vertebral column is the stacked chain of bones that supports the trunk, protects the spinal cord, and gives the back its curves.",
            detailed: "The vertebral column consists of 33 vertebrae grouped into cervical (7), thoracic (12), lumbar (5), sacral (5, fused into the sacrum), and coccygeal (4, fused into the coccyx) regions. It has four curvatures — cervical and lumbar lordosis (concave posteriorly) and thoracic and sacral kyphosis (convex posteriorly) — which develop through infancy and help absorb mechanical load. Between adjacent vertebral bodies, intervertebral discs (an outer annulus fibrosus and inner nucleus pulposus) act as shock absorbers and allow flexibility.",
            points: [
              "Regions: cervical (7), thoracic (12), lumbar (5), sacral (5 fused), coccygeal (4 fused)",
              "Curvatures: cervical and lumbar lordosis, thoracic and sacral kyphosis",
              "Intervertebral discs: outer annulus fibrosus, inner nucleus pulposus",
              "The vertebral canal, formed by successive vertebral foramina, houses the spinal cord",
            ],
            clinical: "A herniated disc occurs when the nucleus pulposus pushes through a weakened annulus fibrosus, often compressing a nearby spinal nerve root — most common at L4-L5 and L5-S1 due to the high mechanical load on the lumbar spine.",
            mnemonic: "'Breakfast, Lunch, and Dinner, Snack after Supper' — Cervical (7), Thoracic (12), Lumbar (5), Sacral (5), Coccygeal (4).",
            terms: [
              { term: "Lordosis", def: "An inward (concave) curvature of the spine, normal in the cervical and lumbar regions." },
              { term: "Kyphosis", def: "An outward (convex) curvature of the spine, normal in the thoracic and sacral regions." },
              { term: "Annulus fibrosus", def: "The tough outer ring of an intervertebral disc." },
            ],
          },
          {
            id: "spinal-cord-meninges",
            funFact: "Despite popular belief, the spinal cord doesn't run the full length of the spine — in adults it ends around the first or second lumbar vertebra.",
            name: "Spinal Cord & Meninges",
            completed: false,
            simple: "The spinal cord runs through the vertebral canal, wrapped in three protective layers, and ends higher up than most people expect.",
            detailed: "The spinal cord is surrounded by three meningeal layers — dura mater (outermost, tough), arachnoid mater (middle), and pia mater (innermost, adherent to the cord) — with cerebrospinal fluid filling the subarachnoid space between arachnoid and pia. In adults, the spinal cord itself ends around vertebral level L1-L2 (the conus medullaris), well above the end of the vertebral canal, so the dural sac and subarachnoid space continue down to around S2, filled below the cord's end with the cauda equina — a bundle of lumbar and sacral nerve roots.",
            points: [
              "Meningeal layers (outer to inner): dura mater, arachnoid mater, pia mater",
              "Cerebrospinal fluid fills the subarachnoid space, between arachnoid and pia",
              "Spinal cord ends at the conus medullaris, around vertebral level L1-L2 in adults",
              "Cauda equina: bundle of nerve roots below the conus medullaris",
              "Dural sac extends to about S2, well below where the cord itself ends",
            ],
            clinical: "Because the spinal cord ends around L1-L2, a lumbar puncture is safely performed lower, typically at the L3-L4 or L4-L5 interspace, avoiding injury to the cord while still accessing CSF in the subarachnoid space.",
            mnemonic: "The cord ends around L1-L2; needles go in around L3-L4 — well below the cord, safely among the cauda equina.",
            terms: [
              { term: "Conus medullaris", def: "The tapered, terminal end of the spinal cord, around vertebral level L1-L2." },
              { term: "Cauda equina", def: "The bundle of nerve roots below the conus medullaris, resembling a horse's tail." },
              { term: "Lumbar puncture", def: "A procedure to sample CSF from the subarachnoid space, performed below the level of the spinal cord." },
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
            funFact: "A resting heart beats about 100,000 times a day — roughly 35 million times a year — without ever truly resting the way skeletal muscle does.",
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
            funFact: "At rest, the heart pumps roughly 5 liters of blood per minute — close to a person's entire blood volume — every single minute.",
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
            funFact: "The kidneys filter the body's entire blood volume roughly 40 to 60 times every day, even though daily urine output is only about 1 to 2 liters.",
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
            funFact: "About 99% of the fluid the kidneys filter each day is reabsorbed back into the blood — only a tiny fraction actually becomes urine.",
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
      {
        id: "p3",
        title: "Blood Physiology",
        topics: [
          {
            id: "hemostasis-coagulation",
            funFact: "A single platelet lives only about 8 to 10 days, and the body replaces them by producing roughly 100 billion new platelets daily.",
            name: "Hemostasis & Coagulation",
            completed: false,
            simple: "Hemostasis is the body's process for stopping bleeding — first by plugging the injury with platelets, then reinforcing it with a fibrin clot.",
            detailed: "Hemostasis has three overlapping stages: vascular spasm (immediate vessel constriction), primary hemostasis (platelets adhere to exposed collagen via von Willebrand factor and aggregate to form a platelet plug), and secondary hemostasis (the coagulation cascade converts fibrinogen to fibrin, stabilizing the clot). The cascade has intrinsic and extrinsic pathways that converge on a common pathway activating thrombin, which converts fibrinogen to fibrin.",
            points: [
              "Vascular spasm: immediate vessel constriction to reduce blood flow",
              "Primary hemostasis: platelet adhesion (via von Willebrand factor) and aggregation",
              "Secondary hemostasis: coagulation cascade produces fibrin to stabilize the clot",
              "Intrinsic and extrinsic pathways converge on the common pathway, activating thrombin",
            ],
            clinical: "Hemophilia A results from a deficiency of factor VIII, impairing the intrinsic pathway and causing prolonged bleeding, especially into joints. Warfarin inhibits vitamin K-dependent clotting factors and is monitored using the INR (a standardized measure of the prothrombin time).",
            mnemonic: "Primary hemostasis = platelet plug. Secondary hemostasis = fibrin reinforcement.",
            terms: [
              { term: "Von Willebrand factor", def: "Protein that helps platelets adhere to damaged vessel walls." },
              { term: "Fibrin", def: "The protein mesh that stabilizes a blood clot, formed from fibrinogen." },
              { term: "INR", def: "International Normalized Ratio — standardized measure used to monitor warfarin therapy." },
            ],
          },
          {
            id: "blood-groups-transfusion",
            funFact: "Type O-negative blood is called the 'universal donor' because it lacks A, B, and Rh(D) antigens, making it the safest choice in emergencies before blood type is known.",
            name: "Blood Groups & Transfusion",
            completed: false,
            simple: "Blood type depends on markers (antigens) on red blood cells, and mismatched transfusions can trigger a dangerous immune reaction.",
            detailed: "The ABO system classifies blood by A and B antigens on red cells, with corresponding antibodies in the plasma against whichever antigen is absent. Type O has neither antigen (universal donor for red cells), while type AB has both (universal recipient). The Rh system adds another antigen (D); Rh-negative individuals can develop anti-D antibodies if exposed to Rh-positive blood, which matters especially in pregnancy (hemolytic disease of the newborn).",
            points: [
              "Type A: A antigen, anti-B antibodies",
              "Type B: B antigen, anti-A antibodies",
              "Type AB: both antigens, no antibodies against A or B — universal plasma recipient",
              "Type O: no antigens, both antibodies — universal red cell donor",
              "Rh-negative mothers can form anti-D antibodies against an Rh-positive fetus",
            ],
            clinical: "Rh incompatibility between an Rh-negative mother and Rh-positive fetus can cause hemolytic disease of the newborn in subsequent pregnancies; this is prevented with Rh immunoglobulin (RhoGAM) given to the mother.",
            terms: [
              { term: "Antigen", def: "A marker on the red cell surface that determines blood type." },
              { term: "Hemolytic disease of the newborn", def: "Destruction of fetal red cells due to maternal antibodies, classically from Rh incompatibility." },
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
        id: "b0",
        title: "Foundations of Biochemistry",
        topics: [
          {
            id: "chemical-basis-of-life",
            funFact: "The human body is about 60% water by weight, and nearly every biochemical reaction inside your cells happens dissolved in it.",
            name: "Chemical Basis of Life",
            completed: false,
            simple: "Living things are built from a small set of chemical building blocks — water, carbohydrates, lipids, proteins, and nucleic acids — organized into cells.",
            detailed: "Biochemistry rests on the properties of water (a polar solvent enabling most biological reactions), and four major classes of biomolecules: carbohydrates (energy and structure), lipids (energy storage and membranes), proteins (structure and function via enzymes), and nucleic acids (information storage and transfer). Weak, reversible bonds — hydrogen bonds, ionic interactions, van der Waals forces — allow biomolecules to fold and interact dynamically, which is essential for processes like enzyme binding and DNA base pairing.",
            points: [
              "Water's polarity makes it an excellent solvent for biological reactions",
              "Four major biomolecule classes: carbohydrates, lipids, proteins, nucleic acids",
              "Proteins are built from amino acids linked by peptide bonds",
              "Weak, reversible bonds (hydrogen bonds, van der Waals) allow dynamic molecular interactions",
              "pH and buffers keep the body's internal chemistry within a narrow functional range",
            ],
            clinical: "Small changes in blood pH can be life-threatening — the body uses buffer systems (like bicarbonate) to keep pH tightly controlled around 7.4, and conditions like diabetic ketoacidosis or respiratory failure can overwhelm these buffers.",
            terms: [
              { term: "Buffer", def: "A system that resists changes in pH by absorbing excess acid or base." },
              { term: "Peptide bond", def: "The covalent bond linking amino acids together to form proteins." },
            ],
          },
          {
            id: "biochem-in-medicine",
            funFact: "More than a quarter of all prescription drugs work by targeting a specific enzyme, either blocking or boosting one particular biochemical reaction.",
            name: "Biochemistry in Medicine",
            completed: false,
            simple: "Biochemistry underlies how diseases develop and how most drugs and lab tests work, making it a foundation for clinical medicine.",
            detailed: "Many diseases are, at their core, biochemical problems — a missing enzyme, an accumulating toxic metabolite, or a disrupted signaling pathway. Diagnostic medicine relies heavily on biochemical markers (blood glucose, liver enzymes, cholesterol panels), and most drugs work by targeting specific biochemical pathways — inhibiting an enzyme, blocking a receptor, or altering a metabolic process. Understanding normal biochemistry is what makes it possible to recognize what's going wrong in disease.",
            points: [
              "Inborn errors of metabolism result from missing or defective enzymes",
              "Common lab tests (glucose, lipid panel, liver enzymes) are direct biochemical measurements",
              "Most drugs act by targeting a specific biochemical pathway or molecule",
              "Biochemistry connects molecular-level changes to whole-body disease symptoms",
            ],
            clinical: "Statins lower cholesterol by inhibiting HMG-CoA reductase, the rate-limiting enzyme in cholesterol synthesis — a classic example of a drug designed around a specific biochemical target.",
            terms: [
              { term: "Inborn error of metabolism", def: "A genetic condition caused by a missing or defective enzyme in a metabolic pathway." },
              { term: "HMG-CoA reductase", def: "The rate-limiting enzyme in cholesterol synthesis, targeted by statin drugs." },
            ],
          },
        ],
      },
      {
        id: "b1",
        title: "Carbohydrate Metabolism",
        topics: [
          {
            id: "glycolysis",
            funFact: "Mature red blood cells have no mitochondria at all, so they rely entirely on glycolysis for energy — they can't run the Krebs cycle.",
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
            funFact: "The Krebs cycle is also called the citric acid cycle because its first step produces citrate — the same acid found in citrus fruit.",
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
            funFact: "The urea your liver produces is the same compound manufactured industrially as an ingredient in some fertilizers and skin moisturizers.",
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
            funFact: "Just 20 standard amino acids build every protein in the human body, yet their combinations can form virtually unlimited protein structures.",
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

/* -------------------------------- Quiz data ------------------------------- */
const QUIZZES = {
  anatomy: [
    {
      q: "Which nerve roots form the brachial plexus?",
      options: ["C1–C4", "C5–T1", "T1–T5", "L1–L5"],
      correct: 1,
      explanation: "The brachial plexus is formed by the ventral rami of C5 through T1.",
    },
    {
      q: "Erb's palsy results from injury to which part of the brachial plexus?",
      options: ["Upper trunk (C5–C6)", "Lower trunk (C8–T1)", "Posterior cord", "Radial nerve only"],
      correct: 0,
      explanation: "Erb's palsy is caused by an upper trunk injury (C5–C6), producing the 'waiter's tip' posture.",
    },
    {
      q: "Which muscles make up the rotator cuff?",
      options: [
        "Deltoid, biceps, triceps, brachialis",
        "Supraspinatus, infraspinatus, teres minor, subscapularis",
        "Pectoralis major, latissimus dorsi, trapezius",
        "Rhomboids, levator scapulae, serratus anterior",
      ],
      correct: 1,
      explanation: "SITS: Supraspinatus, Infraspinatus, Teres minor, Subscapularis.",
    },
    {
      q: "Which valve separates the right atrium and right ventricle?",
      options: ["Mitral valve", "Aortic valve", "Tricuspid valve", "Pulmonary valve"],
      correct: 2,
      explanation: "The tricuspid valve is the AV valve on the right side of the heart.",
    },
    {
      q: "Which vessel carries deoxygenated blood from the right ventricle to the lungs?",
      options: ["Aorta", "Pulmonary trunk", "Superior vena cava", "Pulmonary vein"],
      correct: 1,
      explanation: "The pulmonary trunk carries deoxygenated blood from the right ventricle toward the lungs.",
    },
    {
      q: "Which nerve is most commonly injured in a mid-shaft humerus fracture?",
      options: ["Median nerve", "Ulnar nerve", "Radial nerve", "Axillary nerve"],
      correct: 2,
      explanation: "The radial nerve runs in the spiral (radial) groove of the humerus and is vulnerable in mid-shaft fractures.",
    },
    {
      q: "The axillary nerve is a branch of which cord of the brachial plexus?",
      options: ["Lateral cord", "Posterior cord", "Medial cord", "Upper trunk directly"],
      correct: 1,
      explanation: "The axillary nerve arises from the posterior cord of the brachial plexus.",
    },
    {
      q: "Injury to the axillary nerve typically causes sensory loss over which area?",
      options: [
        "The palm of the hand",
        "The 'regimental badge' area over the deltoid",
        "The medial forearm",
        "The sole of the foot",
      ],
      correct: 1,
      explanation: "The axillary nerve supplies sensation over the deltoid — the 'regimental badge' area.",
    },
    {
      q: "What structure deepens the glenoid fossa to help stabilize the shoulder?",
      options: ["Acromion process", "Glenoid labrum", "Coracoid process", "Bicipital groove"],
      correct: 1,
      explanation: "The glenoid labrum is a fibrocartilage rim that deepens the shallow glenoid fossa.",
    },
    {
      q: "Why are anterior shoulder dislocations far more common than posterior ones?",
      options: [
        "The posterior capsule is thicker and stronger",
        "The anterior shoulder has stronger stabilizing structures",
        "The posterior socket is deeper",
        "There is no real difference clinically",
      ],
      correct: 0,
      explanation: "The anterior capsule and ligaments are relatively weaker, making anterior dislocation far more common.",
    },
    {
      q: "Which heart chamber has the thickest muscular wall?",
      options: ["Right atrium", "Left atrium", "Right ventricle", "Left ventricle"],
      correct: 3,
      explanation: "The left ventricle has the thickest wall, reflecting the high pressure needed to pump blood to the whole body.",
    },
    {
      q: "What is the correct order of blood flow through the right side of the heart?",
      options: [
        "RA → Mitral valve → RV → Aortic valve",
        "RA → Tricuspid valve → RV → Pulmonary valve",
        "RV → Tricuspid valve → RA → Pulmonary valve",
        "RA → Pulmonary valve → RV → Tricuspid valve",
      ],
      correct: 1,
      explanation: "Blood flows: right atrium → tricuspid valve → right ventricle → pulmonary valve → lungs.",
    },
    {
      q: "Which vessels return oxygenated blood to the left atrium?",
      options: ["Vena cavae", "Pulmonary arteries", "Pulmonary veins", "Coronary sinus"],
      correct: 2,
      explanation: "The four pulmonary veins carry oxygenated blood from the lungs back to the left atrium.",
    },
    {
      q: "The superior and inferior vena cava drain into which chamber?",
      options: ["Left atrium", "Right atrium", "Left ventricle", "Right ventricle"],
      correct: 1,
      explanation: "Both the SVC and IVC drain deoxygenated systemic blood into the right atrium.",
    },
    {
      q: "Which valve prevents backflow of blood from the aorta into the left ventricle?",
      options: ["Mitral valve", "Tricuspid valve", "Pulmonary valve", "Aortic valve"],
      correct: 3,
      explanation: "The aortic valve closes after ejection to prevent blood flowing back into the left ventricle.",
    },
  ],
  physiology: [
    {
      q: "What does the first heart sound (S1) represent?",
      options: [
        "Closure of the semilunar valves",
        "Closure of the AV valves",
        "Opening of the AV valves",
        "Atrial contraction",
      ],
      correct: 1,
      explanation: "S1 ('lub') is caused by closure of the AV valves — tricuspid and mitral — at the start of systole.",
    },
    {
      q: "Which formula correctly defines cardiac output?",
      options: [
        "Heart Rate ÷ Stroke Volume",
        "Heart Rate × Stroke Volume",
        "Stroke Volume − Heart Rate",
        "Preload × Afterload",
      ],
      correct: 1,
      explanation: "Cardiac output = Heart Rate × Stroke Volume.",
    },
    {
      q: "According to the Frank-Starling law, what happens when venous return increases?",
      options: [
        "Stroke volume decreases",
        "Heart rate decreases",
        "Stroke volume increases",
        "No change occurs",
      ],
      correct: 2,
      explanation: "Greater ventricular filling (preload) produces a stronger contraction, increasing stroke volume.",
    },
    {
      q: "What is a normal glomerular filtration rate (GFR) in a healthy adult?",
      options: ["About 12 mL/min", "About 60 mL/min", "About 125 mL/min", "About 300 mL/min"],
      correct: 2,
      explanation: "Normal GFR is roughly 125 mL/min, about 180 L/day.",
    },
    {
      q: "Which hormone primarily increases water reabsorption in the collecting duct?",
      options: ["Aldosterone", "ADH", "Insulin", "Cortisol"],
      correct: 1,
      explanation: "ADH (antidiuretic hormone) increases water reabsorption in the collecting duct.",
    },
    {
      q: "What causes the second heart sound (S2)?",
      options: [
        "Closure of the AV valves",
        "Opening of the semilunar valves",
        "Closure of the semilunar valves",
        "Ventricular filling",
      ],
      correct: 2,
      explanation: "S2 ('dub') is caused by closure of the semilunar valves (aortic and pulmonary) at the start of diastole.",
    },
    {
      q: "During which phase of the cardiac cycle are all four valves closed?",
      options: ["Ejection", "Isovolumetric contraction", "Rapid filling", "Atrial systole"],
      correct: 1,
      explanation: "In isovolumetric contraction, all valves are closed and pressure rises with no change in ventricular volume.",
    },
    {
      q: "At rest, roughly what fraction of the cardiac cycle is spent in diastole?",
      options: ["One-quarter", "One-half", "Two-thirds", "Nearly all of it"],
      correct: 2,
      explanation: "Diastole makes up roughly two-thirds of the cardiac cycle at a normal resting heart rate.",
    },
    {
      q: "Which of these directly increases stroke volume?",
      options: ["Increased afterload", "Increased preload", "Decreased contractility", "Parasympathetic stimulation"],
      correct: 1,
      explanation: "Increased preload (via the Frank-Starling mechanism) generally increases stroke volume.",
    },
    {
      q: "What effect does sympathetic stimulation have on the heart?",
      options: [
        "Decreases heart rate and contractility",
        "Increases heart rate and contractility",
        "Only affects blood vessels, not the heart",
        "Has no measurable effect",
      ],
      correct: 1,
      explanation: "Sympathetic stimulation increases both heart rate and contractility.",
    },
    {
      q: "In heart failure, how does the Frank-Starling curve typically change?",
      options: [
        "It shifts upward, improving output",
        "It shifts downward, so more filling gives less added force",
        "It becomes a straight horizontal line",
        "It is unaffected by heart failure",
      ],
      correct: 1,
      explanation: "In heart failure, the curve shifts downward — the ventricle generates less force for a given stretch.",
    },
    {
      q: "Which kidney structure creates the concentration gradient that allows urine to be concentrated?",
      options: ["Glomerulus", "Proximal tubule", "Loop of Henle", "Renal artery"],
      correct: 2,
      explanation: "The loop of Henle establishes the medullary concentration gradient via countercurrent multiplication.",
    },
    {
      q: "What does the proximal tubule mainly reabsorb?",
      options: [
        "Only water",
        "Glucose, amino acids, and sodium in bulk",
        "Only potassium",
        "Nothing — it only secretes waste",
      ],
      correct: 1,
      explanation: "The proximal tubule reabsorbs the bulk of filtered glucose, amino acids, and sodium.",
    },
    {
      q: "What happens when blood glucose exceeds the kidney's transport maximum for glucose?",
      options: [
        "Glucose is stored in the kidney",
        "Glucose spills into the urine (glucosuria)",
        "The kidney stops filtering blood",
        "Glucose is converted to protein",
      ],
      correct: 1,
      explanation: "Once the transport maximum is exceeded, glucose can't all be reabsorbed and spills into urine.",
    },
    {
      q: "Which hormone increases sodium reabsorption and potassium secretion in the distal nephron?",
      options: ["ADH", "Aldosterone", "Renin", "Erythropoietin"],
      correct: 1,
      explanation: "Aldosterone acts on the distal tubule and collecting duct to increase Na+ reabsorption and K+ secretion.",
    },
  ],
  biochemistry: [
    {
      q: "Where in the cell does glycolysis take place?",
      options: ["Mitochondrial matrix", "Nucleus", "Cytoplasm", "Endoplasmic reticulum"],
      correct: 2,
      explanation: "Glycolysis occurs in the cytoplasm and doesn't require oxygen.",
    },
    {
      q: "What is the key regulatory enzyme of glycolysis?",
      options: ["Hexokinase", "Phosphofructokinase-1 (PFK-1)", "Pyruvate kinase", "Citrate synthase"],
      correct: 1,
      explanation: "PFK-1 is the main rate-limiting, regulatory enzyme of glycolysis.",
    },
    {
      q: "Per acetyl-CoA, how many NADH molecules does the Krebs cycle produce?",
      options: ["1", "2", "3", "4"],
      correct: 2,
      explanation: "Each turn of the Krebs cycle produces 3 NADH per acetyl-CoA.",
    },
    {
      q: "What is the main purpose of the urea cycle?",
      options: [
        "Break down glucose for energy",
        "Convert toxic ammonia into excretable urea",
        "Store fat in the liver",
        "Synthesize new amino acids",
      ],
      correct: 1,
      explanation: "The urea cycle converts toxic ammonia into water-soluble urea for safe excretion by the kidneys.",
    },
    {
      q: "Which amino acids are purely ketogenic?",
      options: ["Glycine and alanine", "Leucine and lysine", "Glutamate and aspartate", "Serine and threonine"],
      correct: 1,
      explanation: "Leucine and lysine are the only two amino acids that are purely ketogenic.",
    },
    {
      q: "What is the net ATP yield from glycolysis per glucose molecule?",
      options: ["Net 0 ATP", "Net 2 ATP", "Net 8 ATP", "Net 36 ATP"],
      correct: 1,
      explanation: "Glycolysis invests 2 ATP and produces 4, for a net gain of 2 ATP per glucose.",
    },
    {
      q: "What happens to pyruvate under low-oxygen (anaerobic) conditions?",
      options: [
        "It enters the Krebs cycle directly",
        "It is converted to lactate",
        "It is converted to glucose",
        "It is excreted unchanged",
      ],
      correct: 1,
      explanation: "Under anaerobic conditions, pyruvate is converted to lactate to regenerate NAD+ for glycolysis to continue.",
    },
    {
      q: "What is the 'Warburg effect' seen in many cancer cells?",
      options: [
        "Increased reliance on the Krebs cycle only",
        "Heavy reliance on glycolysis even when oxygen is available",
        "Complete shutdown of glucose metabolism",
        "Exclusive use of fatty acid oxidation",
      ],
      correct: 1,
      explanation: "The Warburg effect describes cancer cells favoring glycolysis for energy even in the presence of oxygen.",
    },
    {
      q: "In which cellular compartment does the Krebs cycle take place?",
      options: ["Cytoplasm", "Mitochondrial matrix", "Nucleus", "Golgi apparatus"],
      correct: 1,
      explanation: "The Krebs cycle occurs in the mitochondrial matrix.",
    },
    {
      q: "What molecule does the Krebs cycle regenerate so it can keep running?",
      options: ["Glucose", "Acetyl-CoA", "Oxaloacetate", "Pyruvate"],
      correct: 2,
      explanation: "Oxaloacetate is regenerated at the end of the cycle to combine with the next acetyl-CoA.",
    },
    {
      q: "Which enzyme is the key regulatory step of the Krebs cycle?",
      options: ["PFK-1", "Isocitrate dehydrogenase", "Hexokinase", "Lactate dehydrogenase"],
      correct: 1,
      explanation: "Isocitrate dehydrogenase is the main rate-limiting enzyme of the Krebs cycle.",
    },
    {
      q: "In which organ does the urea cycle primarily take place?",
      options: ["Kidney", "Liver", "Pancreas", "Spleen"],
      correct: 1,
      explanation: "The urea cycle takes place primarily in the liver.",
    },
    {
      q: "What is the rate-limiting enzyme of the urea cycle?",
      options: [
        "Carbamoyl phosphate synthetase I",
        "Arginase",
        "Ornithine transcarbamylase",
        "Argininosuccinate synthetase",
      ],
      correct: 0,
      explanation: "Carbamoyl phosphate synthetase I catalyzes the rate-limiting first step of the urea cycle.",
    },
    {
      q: "What is transamination?",
      options: [
        "Breakdown of glucose into pyruvate",
        "Transfer of an amino group from an amino acid to a keto acid",
        "Formation of urea from ammonia",
        "Synthesis of fatty acids",
      ],
      correct: 1,
      explanation: "Transamination transfers an amino group onto a keto acid (often alpha-ketoglutarate), forming glutamate.",
    },
    {
      q: "Phenylketonuria (PKU) results from a defect in which enzyme?",
      options: [
        "Phenylalanine hydroxylase",
        "Carbamoyl phosphate synthetase I",
        "Isocitrate dehydrogenase",
        "PFK-1",
      ],
      correct: 0,
      explanation: "PKU results from a defective phenylalanine hydroxylase, which normally converts phenylalanine to tyrosine.",
    },
  ],
};

/* ---------------------------- MBBS Questions bank -------------------------- */
/* Starter batch — grows over time via extraContent.js */
const MBBS_QUESTIONS = {
  anatomy: [
    { q: "Which structure is the primary blood supply to the femoral head, at risk in femoral neck fractures?", options: ["Obturator artery", "Medial and lateral circumflex femoral arteries", "Superior gluteal artery", "Femoral vein"], correct: 1, explanation: "The retinacular branches of the medial and lateral circumflex femoral arteries supply the femoral head and are vulnerable in femoral neck fractures." },
    { q: "The recurrent laryngeal nerve is a branch of which cranial nerve?", options: ["Cranial nerve IX", "Cranial nerve X (vagus)", "Cranial nerve XI", "Cranial nerve XII"], correct: 1, explanation: "The recurrent laryngeal nerve is a branch of the vagus nerve (CN X), supplying most laryngeal muscles." },
    { q: "Which vertebral level typically marks the bifurcation of the abdominal aorta?", options: ["T12", "L1", "L4", "S1"], correct: 2, explanation: "The abdominal aorta typically bifurcates into the common iliac arteries at the L4 vertebral level." },
    { q: "The inguinal canal transmits which structure in males?", options: ["Femoral nerve", "Spermatic cord", "Sciatic nerve", "Great saphenous vein"], correct: 1, explanation: "In males, the inguinal canal transmits the spermatic cord." },
    { q: "Which muscle is the primary abductor of the arm beyond the first 15 degrees?", options: ["Supraspinatus", "Deltoid", "Infraspinatus", "Teres major"], correct: 1, explanation: "Supraspinatus initiates abduction; the deltoid takes over as the primary abductor beyond about 15 degrees." },
    { q: "The phrenic nerve, which supplies the diaphragm, arises from which spinal levels?", options: ["C1-C2", "C3-C5", "T1-T4", "L1-L3"], correct: 1, explanation: "The phrenic nerve arises from C3, C4, and C5 — 'C3, 4, 5 keeps the diaphragm alive.'" },
    { q: "Which structure separates the anterior and posterior chambers of the eye?", options: ["Cornea", "Iris", "Retina", "Sclera"], correct: 1, explanation: "The iris separates the anterior and posterior chambers of the eye, with the pupil at its center." },
  ],
  physiology: [
    { q: "Which segment of the nephron is impermeable to water, contributing to dilution of urine?", options: ["Proximal tubule", "Descending loop of Henle", "Thick ascending loop of Henle", "Collecting duct"], correct: 2, explanation: "The thick ascending limb actively transports ions but is impermeable to water, diluting the tubular fluid." },
    { q: "Which lung volume is measured as the amount of air moved in a normal, quiet breath?", options: ["Residual volume", "Tidal volume", "Vital capacity", "Inspiratory reserve volume"], correct: 1, explanation: "Tidal volume is the amount of air inhaled or exhaled during normal quiet breathing." },
    { q: "Which hormone is released in response to low blood glucose to stimulate glycogen breakdown?", options: ["Insulin", "Glucagon", "Somatostatin", "Cortisol only"], correct: 1, explanation: "Glucagon is released by pancreatic alpha cells in response to hypoglycemia, promoting glycogenolysis." },
    { q: "The Bohr effect describes how which factor shifts the oxygen-hemoglobin dissociation curve?", options: ["Temperature only", "A decrease in pH (increase in CO2/acidity)", "Increased oxygen concentration", "Altitude alone"], correct: 1, explanation: "A decrease in pH (more CO2/acid) shifts the curve right, promoting oxygen release to tissues — the Bohr effect." },
    { q: "Which chamber of the heart generates the pacemaker signal that sets normal heart rate?", options: ["AV node", "SA node", "Bundle of His", "Purkinje fibers"], correct: 1, explanation: "The sinoatrial (SA) node in the right atrium is the heart's natural pacemaker." },
    { q: "Which of the following best describes negative feedback in physiology?", options: [ "A response that amplifies the original stimulus", "A response that opposes and reduces the original stimulus", "A response with no relation to the stimulus", "A response only seen in disease states" ], correct: 1, explanation: "Negative feedback opposes a change, returning a variable toward its set point — the most common regulatory mechanism in physiology." },
  ],
  biochemistry: [
    { q: "Which vitamin deficiency causes beriberi, affecting the nervous and cardiovascular systems?", options: ["Vitamin B1 (thiamine)", "Vitamin B12", "Vitamin C", "Vitamin D"], correct: 0, explanation: "Thiamine (B1) deficiency causes beriberi, impairing energy metabolism especially in nerve and cardiac tissue." },
    { q: "Which enzyme deficiency causes classic galactosemia?", options: ["Lactase", "Galactose-1-phosphate uridyltransferase", "Glucose-6-phosphate dehydrogenase", "Fructokinase"], correct: 1, explanation: "Classic galactosemia results from a deficiency of galactose-1-phosphate uridyltransferase." },
    { q: "DNA replication proceeds in which direction on the template strand?", options: ["5' to 3' only on the new strand", "3' to 5' on the new strand", "In both directions equally on both strands simultaneously", "Direction is random"], correct: 0, explanation: "DNA polymerase synthesizes the new strand in the 5' to 3' direction, reading the template 3' to 5'." },
    { q: "Which lipoprotein is primarily responsible for transporting cholesterol from the liver to tissues?", options: ["HDL", "LDL", "Chylomicrons", "VLDL only"], correct: 1, explanation: "LDL ('bad cholesterol') carries cholesterol from the liver to peripheral tissues." },
    { q: "Which amino acid is the precursor for serotonin synthesis?", options: ["Tyrosine", "Tryptophan", "Phenylalanine", "Glycine"], correct: 1, explanation: "Tryptophan is the precursor for serotonin (and later melatonin) synthesis." },
    { q: "Beta-oxidation of fatty acids for energy takes place primarily in which organelle?", options: ["Cytoplasm", "Nucleus", "Mitochondria", "Golgi apparatus"], correct: 2, explanation: "Beta-oxidation of fatty acids occurs in the mitochondrial matrix, generating acetyl-CoA for the Krebs cycle." },
  ],
};

/* ---------------------------- Past Questions storage ------------------------ */

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
function HomeScreen({ onOpenSubject, onGoToStudy, profile }) {
  const studentName = profile.name || "Student";
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
            {studentName.charAt(0).toUpperCase()}
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

        {topic.funFact && (
          <section className="p-3.5 rounded-sm border" style={{ borderColor: LINE, background: "#FAF7EE" }}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Sparkles size={14} color="#8A7F63" />
              <Label>Fun Fact</Label>
            </div>
            <p className="text-[12.5px] leading-relaxed italic" style={{ color: "#5B5340" }}>{topic.funFact}</p>
          </section>
        )}

        <AiTutorPanel topicName={topic.name} color={subject.color} tint={subject.tint} />
      </div>
    </div>
  );
}

/* --------------------------------- QUIZ ------------------------------------ */
function QuizHome({ onSelectCategory }) {
  const categories = [
    { id: "mcq", title: "MCQ Practice", desc: "15 questions per subject, instant feedback", color: "#B8432E" },
    { id: "mbbs", title: "MBBS Questions", desc: "Exam-style questions, growing over time", color: "#3B5B7A" },
    { id: "past", title: "Past Questions", desc: "Paste questions from your school", color: "#5C7A52" },
  ];
  return (
    <div className="px-5 pt-6 pb-28 space-y-4">
      <div>
        <h1 className="text-[24px] leading-tight" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>Quiz</h1>
        <p className="text-[12.5px] mt-1" style={{ color: MUTED }}>Choose how you want to test yourself.</p>
      </div>
      {categories.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelectCategory(c.id)}
          className="w-full text-left bg-white rounded-sm border overflow-hidden flex items-stretch"
          style={{ borderColor: LINE }}
        >
          <div className="w-1.5 shrink-0" style={{ background: c.color }} />
          <div className="flex-1 p-4 flex items-center justify-between">
            <div>
              <p className="text-[16px]" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>{c.title}</p>
              <p className="text-[12px] mt-1" style={{ color: MUTED }}>{c.desc}</p>
            </div>
            <ChevronRight size={17} color="#B3A889" />
          </div>
        </button>
      ))}
    </div>
  );
}

function QuizSubjectList({ onStartQuiz, onBack, title, bank }) {
  return (
    <div className="px-5 pt-6 pb-28 space-y-4">
      <button onClick={onBack} className="flex items-center gap-1" style={{ color: "#B8432E" }}>
        <ChevronLeft size={16} />
        <span className="text-[12px]" style={{ fontFamily: MONO }}>Quiz</span>
      </button>
      <div>
        <h1 className="text-[24px] leading-tight" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>{title}</h1>
        <p className="text-[12.5px] mt-1" style={{ color: MUTED }}>Pick a subject.</p>
      </div>
      {SUBJECTS.map((s) => {
        const count = bank[s.id]?.length || 0;
        return (
          <div key={s.id} className="bg-white rounded-sm border overflow-hidden" style={{ borderColor: LINE }}>
            <div className="flex items-stretch">
              <div className="w-1.5 shrink-0" style={{ background: s.color }} />
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[17px]" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>{s.name}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: MUTED, fontFamily: MONO }}>{count} questions</p>
                  </div>
                  <div className="w-9 h-9 rounded-sm flex items-center justify-center text-[9px] font-semibold shrink-0" style={{ background: s.tint, color: s.color, fontFamily: MONO }}>
                    {s.label}
                  </div>
                </div>
                <button
                  onClick={() => onStartQuiz(s)}
                  disabled={count === 0}
                  className="mt-3 w-full py-2.5 rounded-sm text-[12.5px] font-medium flex items-center justify-center gap-1.5"
                  style={{ background: count === 0 ? "#D9D0BC" : s.color, color: "#FFF" }}
                >
                  {count === 0 ? "No questions yet" : "Start Quiz"}
                  {count > 0 && <ChevronRight size={14} />}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PastQuestions({ onBack, entries, onAddEntry }) {
  const [subjectId, setSubjectId] = useState(SUBJECTS[0].id);
  const [school, setSchool] = useState("");
  const [text, setText] = useState("");

  function submit() {
    if (!school.trim() || !text.trim()) return;
    onAddEntry({ id: Date.now(), subjectId, school: school.trim(), text: text.trim() });
    setSchool("");
    setText("");
  }

  const filtered = entries.filter((e) => e.subjectId === subjectId);
  const subject = SUBJECTS.find((s) => s.id === subjectId);

  return (
    <div className="px-5 pt-6 pb-28">
      <button onClick={onBack} className="flex items-center gap-1 mb-4" style={{ color: "#B8432E" }}>
        <ChevronLeft size={16} />
        <span className="text-[12px]" style={{ fontFamily: MONO }}>Quiz</span>
      </button>
      <h1 className="text-[22px] mb-1" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>Past Questions</h1>
      <p className="text-[12.5px] mb-4" style={{ color: MUTED }}>Paste past questions from your school, organized by subject.</p>

      <div className="flex gap-2 mb-4">
        {SUBJECTS.map((s) => (
          <button
            key={s.id}
            onClick={() => setSubjectId(s.id)}
            className="flex-1 py-2 rounded-sm text-[11px] border"
            style={{
              background: subjectId === s.id ? s.color : "#FFFFFF",
              color: subjectId === s.id ? "#FFFFFF" : INK,
              borderColor: subjectId === s.id ? s.color : LINE,
              fontFamily: MONO,
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="p-4 rounded-sm bg-white border space-y-3" style={{ borderColor: LINE }}>
        <div>
          <Label>School Name</Label>
          <input
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            placeholder="e.g. University of Lagos"
            className="mt-1.5 w-full px-3.5 py-2.5 rounded-sm border bg-white text-[13.5px]"
            style={{ color: INK, borderColor: LINE }}
          />
        </div>
        <div>
          <Label>Paste Questions</Label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste past exam questions here..."
            rows={5}
            className="mt-1.5 w-full px-3.5 py-2.5 rounded-sm border bg-white text-[13px] leading-relaxed"
            style={{ color: INK, borderColor: LINE }}
          />
        </div>
        <button
          onClick={submit}
          className="w-full py-2.5 rounded-sm text-[13px] font-medium"
          style={{ background: subject.color, color: "#FFF" }}
        >
          Save
        </button>
      </div>

      <div className="mt-5 space-y-3">
        <Label>{subject.name} — Saved ({filtered.length})</Label>
        {filtered.length === 0 && (
          <p className="text-[12.5px] py-4 text-center" style={{ color: MUTED }}>Nothing saved yet for {subject.name}.</p>
        )}
        {filtered.map((e) => (
          <div key={e.id} className="p-3.5 rounded-sm bg-white border" style={{ borderColor: LINE }}>
            <p className="text-[12px] mb-1.5" style={{ color: subject.color, fontFamily: MONO }}>{e.school}</p>
            <p className="text-[13px] leading-relaxed whitespace-pre-wrap" style={{ color: INK }}>{e.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}



function QuizPlay({ subject, onBack, onFinish, bank }) {
  const questions = bank[subject.id] || [];
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);

  const q = questions[index];
  const isLast = index === questions.length - 1;

  function pick(i) {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
    if (i === q.correct) setScore((s) => s + 1);
  }

  function next() {
    if (isLast) {
      onFinish(score + (selected === q.correct && revealed ? 0 : 0), questions.length, score);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setRevealed(false);
  }

  if (!q) {
    return (
      <div className="px-5 pt-24 pb-28 text-center">
        <p className="text-[13px]" style={{ color: MUTED, fontFamily: MONO }}>No quiz questions yet for this subject.</p>
        <button onClick={onBack} className="mt-4 text-[12px]" style={{ color: subject.color, fontFamily: MONO }}>Go back</button>
      </div>
    );
  }

  return (
    <div className="pb-28">
      <div className="px-5 pt-6 pb-4">
        <button onClick={onBack} className="flex items-center gap-1 mb-3" style={{ color: subject.color }}>
          <ChevronLeft size={16} />
          <span className="text-[12px]" style={{ fontFamily: MONO }}>Quiz</span>
        </button>
        <div className="flex items-center justify-between mb-2">
          <Label color={subject.color}>{subject.name}</Label>
          <span className="text-[11px]" style={{ color: MUTED, fontFamily: MONO }}>
            {index + 1} / {questions.length}
          </span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#0000000f" }}>
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${((index + (revealed ? 1 : 0)) / questions.length) * 100}%`, background: subject.color }}
          />
        </div>
      </div>

      <div className="px-5">
        <p className="text-[16px] leading-snug mb-4" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>
          {q.q}
        </p>

        <div className="space-y-2.5">
          {q.options.map((opt, i) => {
            let bg = "#FFFFFF";
            let border = LINE;
            let textColor = INK;
            if (revealed) {
              if (i === q.correct) {
                bg = "#E1E8DC";
                border = "#5C7A52";
                textColor = "#3E5536";
              } else if (i === selected) {
                bg = "#F3DED9";
                border = "#B8432E";
                textColor = "#8A2E1D";
              }
            }
            return (
              <button
                key={i}
                onClick={() => pick(i)}
                disabled={revealed}
                className="w-full text-left px-4 py-3 rounded-sm border flex items-center justify-between gap-2"
                style={{ background: bg, borderColor: border }}
              >
                <span className="text-[13.5px]" style={{ color: textColor }}>{opt}</span>
                {revealed && i === q.correct && <Check size={16} color="#5C7A52" className="shrink-0" />}
                {revealed && i === selected && i !== q.correct && <X size={16} color="#B8432E" className="shrink-0" />}
              </button>
            );
          })}
        </div>

        {revealed && (
          <div className="mt-4 p-3.5 rounded-sm" style={{ background: subject.tint }}>
            <p className="text-[12.5px] leading-relaxed" style={{ color: INK }}>{q.explanation}</p>
          </div>
        )}

        {revealed && (
          <button
            onClick={next}
            className="mt-4 w-full py-3 rounded-sm text-[13px] font-medium"
            style={{ background: subject.color, color: "#FFF" }}
          >
            {isLast ? "See Results" : "Next Question"}
          </button>
        )}
      </div>
    </div>
  );
}

function QuizResults({ subject, score, total, onRetry, onBack }) {
  const pct = Math.round((score / total) * 100);
  return (
    <div className="px-5 pt-16 pb-28 text-center">
      <div className="flex justify-center mb-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: subject.tint }}
        >
          <Trophy size={28} color={subject.color} />
        </div>
      </div>
      <p className="text-[11px] uppercase tracking-[0.16em]" style={{ color: MUTED, fontFamily: MONO }}>
        {subject.name} Quiz
      </p>
      <h1 className="text-[32px] mt-2" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>
        {score} / {total}
      </h1>
      <p className="text-[13px] mt-1" style={{ color: MUTED }}>
        {pct}% correct
        {pct >= 80 ? " — excellent work" : pct >= 50 ? " — solid effort, review and try again" : " — worth another pass"}
      </p>

      <div className="mt-8 space-y-2.5">
        <button
          onClick={onRetry}
          className="w-full py-3 rounded-sm text-[13px] font-medium flex items-center justify-center gap-1.5"
          style={{ background: subject.color, color: "#FFF" }}
        >
          <RotateCcw size={15} />
          Retry Quiz
        </button>
        <button
          onClick={onBack}
          className="w-full py-3 rounded-sm text-[13px] font-medium border"
          style={{ borderColor: LINE, color: INK }}
        >
          Back to Quiz List
        </button>
      </div>
    </div>
  );
}

/* ------------------------------- CALENDAR ----------------------------------- */
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function StudyCalendar() {
  const now = new Date();
  const defaultYear = now.getFullYear() >= 2026 && now.getFullYear() <= 2035 ? now.getFullYear() : 2026;
  const [year, setYear] = useState(defaultYear);
  const [month, setMonth] = useState(now.getMonth());

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const isToday = (day) =>
    day === now.getDate() && month === now.getMonth() && year === now.getFullYear();

  function prevMonth() {
    if (month === 0) {
      if (year > 2026) { setYear(year - 1); setMonth(11); }
    } else {
      setMonth(month - 1);
    }
  }

  function nextMonth() {
    if (month === 11) {
      if (year < 2035) { setYear(year + 1); setMonth(0); }
    } else {
      setMonth(month + 1);
    }
  }

  return (
    <section className="p-4 rounded-sm bg-white border" style={{ borderColor: LINE }}>
      <div className="flex items-center justify-between mb-1">
        <Label>Study Calendar</Label>
        <div className="flex items-center gap-2">
          <button onClick={prevMonth} className="p-1"><ChevronLeft size={15} color={MUTED} /></button>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="text-[11px] bg-transparent outline-none"
            style={{ color: INK, fontFamily: MONO }}
          >
            {Array.from({ length: 10 }, (_, i) => 2026 + i).map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <button onClick={nextMonth} className="p-1"><ChevronRight size={15} color={MUTED} /></button>
        </div>
      </div>

      <p className="text-[15px] mt-2 mb-3" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>
        {MONTH_NAMES[month]} {year}
      </p>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i} className="text-center text-[9.5px]" style={{ color: MUTED, fontFamily: MONO }}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => (
          <div
            key={i}
            className="aspect-square flex items-center justify-center rounded-sm text-[11.5px]"
            style={{
              background: day && isToday(day) ? "#B8432E" : "transparent",
              color: day && isToday(day) ? "#FFFFFF" : day ? INK : "transparent",
              fontFamily: MONO,
            }}
          >
            {day || ""}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- PROGRESS ---------------------------------- */
function ProgressScreen({ onOpenSubject }) {
  const overall = Math.round(SUBJECTS.reduce((sum, s) => sum + s.progress, 0) / SUBJECTS.length);
  const totalTopics = SUBJECTS.reduce((sum, s) => sum + s.chapters.reduce((c, ch) => c + ch.topics.length, 0), 0);
  const completedTopics = SUBJECTS.reduce(
    (sum, s) => sum + s.chapters.reduce((c, ch) => c + ch.topics.filter((t) => t.completed).length, 0),
    0
  );

  return (
    <div className="px-5 pt-6 pb-28 space-y-6">
      <div>
        <h1 className="text-[24px] leading-tight" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>Progress</h1>
        <p className="text-[12.5px] mt-1" style={{ color: MUTED }}>Your study journey so far.</p>
      </div>

      <section className="p-5 rounded-sm bg-white border text-center" style={{ borderColor: LINE }}>
        <Label>Overall Progress</Label>
        <p className="text-[40px] mt-2 leading-none" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>
          {overall}%
        </p>
        <p className="text-[11.5px] mt-2" style={{ color: MUTED, fontFamily: MONO }}>
          {completedTopics} of {totalTopics} topics studied
        </p>
      </section>

      <section>
        <Label>By Subject</Label>
        <div className="mt-3 space-y-2.5">
          {SUBJECTS.map((s) => (
            <button
              key={s.id}
              onClick={() => onOpenSubject(s)}
              className="w-full text-left bg-white rounded-sm border p-4"
              style={{ borderColor: LINE }}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-sm flex items-center justify-center text-[9px] font-semibold shrink-0"
                    style={{ background: s.tint, color: s.color, fontFamily: MONO }}
                  >
                    {s.label}
                  </div>
                  <p className="text-[14.5px]" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>{s.name}</p>
                </div>
                <ChevronRight size={15} color="#B3A889" />
              </div>
              <ProgressBar pct={s.progress} color={s.color} />
            </button>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-sm bg-white border" style={{ borderColor: LINE }}>
          <div className="flex items-center gap-1.5">
            <Flame size={12} color="#B8432E" />
            <Label>Current Streak</Label>
          </div>
          <p className="text-[26px] mt-2 leading-none" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>
            12<span className="text-[13px] font-normal ml-1" style={{ color: MUTED }}>days</span>
          </p>
        </div>
        <div className="p-4 rounded-sm bg-white border" style={{ borderColor: LINE }}>
          <Label>Best Streak</Label>
          <p className="text-[26px] mt-2 leading-none" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>
            18<span className="text-[13px] font-normal ml-1" style={{ color: MUTED }}>days</span>
          </p>
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

      <StudyCalendar />
    </div>
  );
}

/* -------------------------------- PROFILE ----------------------------------- */
function ProfileRow({ label, sub, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-between px-4 py-3.5 bg-white border-b last:border-b-0" style={{ borderColor: LINE }}>
      <div className="text-left">
        <p className="text-[13.5px]" style={{ color: INK }}>{label}</p>
        {sub && <p className="text-[11px] mt-0.5" style={{ color: MUTED, fontFamily: MONO }}>{sub}</p>}
      </div>
      <ChevronRight size={15} color="#B3A889" />
    </button>
  );
}

function ToggleRow({ label, sub, value, onToggle }) {
  return (
    <div className="w-full flex items-center justify-between px-4 py-3.5 bg-white border-b last:border-b-0" style={{ borderColor: LINE }}>
      <div className="text-left">
        <p className="text-[13.5px]" style={{ color: INK }}>{label}</p>
        {sub && <p className="text-[11px] mt-0.5" style={{ color: MUTED, fontFamily: MONO }}>{sub}</p>}
      </div>
      <button
        onClick={onToggle}
        className="w-11 h-6 rounded-full relative shrink-0 transition-colors"
        style={{ background: value ? "#5C7A52" : "#D9D0BC" }}
      >
        <span
          className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all"
          style={{ left: value ? 22 : 2 }}
        />
      </button>
    </div>
  );
}

function EditProfileForm({ profile, onSave, onCancel }) {
  const [form, setForm] = useState(profile);
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const inputStyle = {
    color: INK,
    fontFamily: "inherit",
    borderColor: LINE,
  };

  return (
    <div className="px-5 pt-6 pb-28">
      <button onClick={onCancel} className="flex items-center gap-1 mb-4" style={{ color: "#B8432E" }}>
        <ChevronLeft size={16} />
        <span className="text-[12px]" style={{ fontFamily: MONO }}>Cancel</span>
      </button>
      <h1 className="text-[22px] mb-5" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>Edit Profile</h1>

      <div className="space-y-4">
        <div>
          <Label>Name</Label>
          <input
            value={form.name}
            onChange={set("name")}
            placeholder="Your name"
            className="mt-1.5 w-full px-3.5 py-3 rounded-sm border bg-white text-[14px]"
            style={inputStyle}
          />
        </div>
        <div>
          <Label>Title</Label>
          <div className="mt-1.5 flex gap-2">
            {["Student", "Doctor"].map((t) => (
              <button
                key={t}
                onClick={() => setForm((f) => ({ ...f, title: t }))}
                className="flex-1 py-2.5 rounded-sm text-[13px] border"
                style={{
                  background: form.title === t ? "#B8432E" : "#FFFFFF",
                  color: form.title === t ? "#FFFFFF" : INK,
                  borderColor: form.title === t ? "#B8432E" : LINE,
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div>
          <Label>Course</Label>
          <input
            value={form.course}
            onChange={set("course")}
            placeholder="e.g. MBBS"
            className="mt-1.5 w-full px-3.5 py-3 rounded-sm border bg-white text-[14px]"
            style={inputStyle}
          />
        </div>
        <div>
          <Label>Year in School</Label>
          <input
            value={form.year}
            onChange={set("year")}
            placeholder="e.g. Year 2"
            className="mt-1.5 w-full px-3.5 py-3 rounded-sm border bg-white text-[14px]"
            style={inputStyle}
          />
        </div>
        <div>
          <Label>Email</Label>
          <input
            value={form.email}
            onChange={set("email")}
            placeholder="you@example.com"
            className="mt-1.5 w-full px-3.5 py-3 rounded-sm border bg-white text-[14px]"
            style={inputStyle}
          />
        </div>
      </div>

      <button
        onClick={() => onSave(form)}
        className="mt-6 w-full py-3 rounded-sm text-[13px] font-medium"
        style={{ background: "#1C2B39", color: "#FFF" }}
      >
        Save Changes
      </button>
    </div>
  );
}

function ProfileScreen({ profile, onSaveProfile }) {
  const [editing, setEditing] = useState(false);
  const [notifs, setNotifs] = useState(true);
  const [reminders, setReminders] = useState(true);

  const totalTopics = SUBJECTS.reduce((sum, s) => sum + s.chapters.reduce((c, ch) => c + ch.topics.length, 0), 0);
  const completedTopics = SUBJECTS.reduce(
    (sum, s) => sum + s.chapters.reduce((c, ch) => c + ch.topics.filter((t) => t.completed).length, 0),
    0
  );

  const displayName = profile.name || "Student";
  const greetingLabel = profile.title === "Doctor" ? `Dr. ${displayName}` : displayName;

  if (editing) {
    return (
      <EditProfileForm
        profile={profile}
        onCancel={() => setEditing(false)}
        onSave={(updated) => { onSaveProfile(updated); setEditing(false); }}
      />
    );
  }

  return (
    <div className="pb-28">
      <div className="px-5 pt-7 pb-6 border-b flex flex-col items-center text-center" style={{ borderColor: LINE }}>
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center border-2 mb-3"
          style={{ borderColor: INK, color: INK, fontFamily: SERIF, fontWeight: 600, fontSize: 24 }}
        >
          {displayName.charAt(0).toUpperCase()}
        </div>
        <h1 className="text-[20px]" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>{greetingLabel}</h1>
        <p className="text-[11.5px] mt-1" style={{ color: MUTED, fontFamily: MONO }}>
          {profile.year || "Year —"} · {profile.course || "Course not set"}
        </p>
        {profile.email && (
          <p className="text-[11px] mt-0.5" style={{ color: MUTED, fontFamily: MONO }}>{profile.email}</p>
        )}
      </div>

      <div className="px-5 mt-5">
        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-3 rounded-sm bg-white border text-center" style={{ borderColor: LINE }}>
            <p className="text-[20px]" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>{completedTopics}/{totalTopics}</p>
            <p className="text-[9.5px] mt-1 uppercase tracking-wide" style={{ color: MUTED, fontFamily: MONO }}>Topics</p>
          </div>
          <div className="p-3 rounded-sm bg-white border text-center" style={{ borderColor: LINE }}>
            <p className="text-[20px]" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>12</p>
            <p className="text-[9.5px] mt-1 uppercase tracking-wide" style={{ color: MUTED, fontFamily: MONO }}>Streak</p>
          </div>
          <div className="p-3 rounded-sm bg-white border text-center" style={{ borderColor: LINE }}>
            <p className="text-[20px]" style={{ color: INK, fontFamily: SERIF, fontWeight: 600 }}>3</p>
            <p className="text-[9.5px] mt-1 uppercase tracking-wide" style={{ color: MUTED, fontFamily: MONO }}>Subjects</p>
          </div>
        </div>
      </div>

      <div className="px-5 mt-6">
        <Label>Account</Label>
        <div className="mt-2 rounded-sm border overflow-hidden" style={{ borderColor: LINE }}>
          <ProfileRow label="Edit Profile" sub="Name, title, course, year, email" onClick={() => setEditing(true)} />
          <ToggleRow label="Notifications" value={notifs} onToggle={() => setNotifs((v) => !v)} />
          <ToggleRow label="Study Reminders" sub="Daily at 7:00 PM" value={reminders} onToggle={() => setReminders((v) => !v)} />
        </div>
      </div>

      <div className="px-5 mt-5">
        <Label>Support</Label>
        <div className="mt-2 rounded-sm border overflow-hidden" style={{ borderColor: LINE }}>
          <ProfileRow label="Help & Support" />
          <ProfileRow label="About MedSphere" />
        </div>
      </div>

      <div className="px-5 mt-6">
        <button className="w-full py-3 rounded-sm text-[13px] font-medium border" style={{ borderColor: "#B8432E", color: "#B8432E" }}>
          Log Out
        </button>
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

  const [profile, setProfile] = useState({ name: "Daniel", title: "Student", course: "MBBS", year: "Year 2", email: "" });

  const [quizCategory, setQuizCategory] = useState(null);
  const [quizSubject, setQuizSubject] = useState(null);
  const [quizStage, setQuizStage] = useState("list");
  const [quizResult, setQuizResult] = useState({ score: 0, total: 0 });
  const [quizKey, setQuizKey] = useState(0);
  const [pastEntries, setPastEntries] = useState([]);

  const goToStudyTab = () => { setActiveTab("study"); setSubject(null); setTopic(null); };
  const openSubjectFromAnywhere = (s) => { setActiveTab("study"); setSubject(s); setTopic(null); };
  const openTopic = (t) => setTopic(t);
  const backToSubjects = () => { setSubject(null); setTopic(null); };
  const backToChapters = () => setTopic(null);

  const quizBank = quizCategory === "mbbs" ? MBBS_QUESTIONS : QUIZZES;
  const quizTitle = quizCategory === "mbbs" ? "MBBS Questions" : "MCQ Practice";

  const startQuiz = (s) => { setQuizSubject(s); setQuizStage("play"); setQuizKey((k) => k + 1); };
  const finishQuiz = (_unused, total, score) => { setQuizResult({ score, total }); setQuizStage("results"); };
  const retryQuiz = () => { setQuizStage("play"); setQuizKey((k) => k + 1); };
  const backToQuizList = () => { setQuizStage("list"); setQuizSubject(null); };
  const backToQuizHome = () => { setQuizCategory(null); setQuizStage("list"); setQuizSubject(null); };

  const changeTab = (tab) => {
    setActiveTab(tab);
    if (tab !== "study") { setSubject(null); setTopic(null); }
    if (tab !== "quiz") { setQuizCategory(null); setQuizStage("list"); setQuizSubject(null); }
  };

  let content;
  if (activeTab === "home") {
    content = <HomeScreen onOpenSubject={openSubjectFromAnywhere} onGoToStudy={goToStudyTab} profile={profile} />;
  } else if (activeTab === "study") {
    content = topic ? (
      <TopicDetail topic={topic} subject={subject} onBack={backToChapters} />
    ) : subject ? (
      <SubjectDetail subject={subject} onBack={backToSubjects} onOpenTopic={openTopic} />
    ) : (
      <SubjectList onOpenSubject={(s) => { setSubject(s); setTopic(null); }} />
    );
  } else if (activeTab === "quiz") {
    if (!quizCategory) {
      content = <QuizHome onSelectCategory={(c) => setQuizCategory(c)} />;
    } else if (quizCategory === "past") {
      content = <PastQuestions onBack={backToQuizHome} entries={pastEntries} onAddEntry={(e) => setPastEntries((p) => [e, ...p])} />;
    } else {
      content =
        quizStage === "play" ? (
          <QuizPlay key={quizKey} subject={quizSubject} onBack={backToQuizList} onFinish={finishQuiz} bank={quizBank} />
        ) : quizStage === "results" ? (
          <QuizResults subject={quizSubject} score={quizResult.score} total={quizResult.total} onRetry={retryQuiz} onBack={backToQuizList} />
        ) : (
          <QuizSubjectList onStartQuiz={startQuiz} onBack={backToQuizHome} title={quizTitle} bank={quizBank} />
        );
    }
  } else if (activeTab === "progress") {
    content = <ProgressScreen onOpenSubject={openSubjectFromAnywhere} />;
  } else if (activeTab === "profile") {
    content = <ProfileScreen profile={profile} onSaveProfile={setProfile} />;
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
