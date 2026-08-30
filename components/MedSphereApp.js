
  Lightbulb,             name: "Shoulder Joint",
            completed: true,
            simple: "The shoulder is a ball-and-socket joint built for a huge range of motion, held together mostly by muscles rather than bone.",
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
            simple: "The urea cycle converts toxic ammonia, produced from breaking down amino acids, into urea s
              "Takes place primarily in the liver",
              "Spans mitochondria (first two steps) and cytoplasm (remaining steps)",
              "Rate-limiting enzyme: carbamoyl phosphate synthetase I",
              "End product urea is excreted by the kidneys",
            ],
            clinical: "Inherited deficiencies in urea cycle enzymes (e.g., ornithine transcarbamylase deficiency) cause ammonia to accumulate, leading to hyperammonemia, which can cause lethargy, vomiting, and if untreated, coma — a key reason newborns are screened for metabolic disorders.",
            
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
full" style={{ width: `${pct}%`, background: color }} />
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
-[12.5px] mt-1" style={{ color: MUTED }}>Choose a subject to continue.</p>
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
    { icon: 
