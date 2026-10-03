"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";

type Lang="en"|"de"|"ti";
const copy={
 en:{hello:"Welcome to Nexora Swiss",sub:"Your AI companion for life and work in Switzerland.",ask:"What do you need help with today?",cv:"CV & Applications",cvd:"Build a Swiss CV and prepare tailored applications.",jobs:"Find Work",jobsd:"Discover and prepare for suitable opportunities.",docs:"Understand a Letter",docsd:"Upload a document and get a clear explanation.",tax:"Tax Declaration",taxd:"Prepare your canton-specific tax declaration step by step.",learn:"Learn German",learnd:"Practice useful German for work and daily life.",interview:"Interview Coach",interviewd:"Practice job interviews with your AI coach.",housing:"Housing",housingd:"Get help with apartment applications and communication.",swiss:"Life in Switzerland",swissd:"Understand common Swiss processes in simple language."},
 de:{hello:"Willkommen bei Nexora Swiss",sub:"Dein KI-Begleiter für Leben und Arbeit in der Schweiz.",ask:"Wobei können wir dir heute helfen?",cv:"CV & Bewerbungen",cvd:"Erstelle einen Schweizer Lebenslauf und passende Bewerbungen.",jobs:"Arbeit finden",jobsd:"Finde passende Stellen und bereite dich darauf vor.",docs:"Brief verstehen",docsd:"Lade ein Dokument hoch und erhalte eine einfache Erklärung.",tax:"Steuererklärung",taxd:"Bereite deine kantonale Steuererklärung Schritt für Schritt vor.",learn:"Deutsch lernen",learnd:"Übe Deutsch für Arbeit und Alltag.",interview:"Interview Coach",interviewd:"Trainiere Bewerbungsgespräche mit deinem KI-Coach.",housing:"Wohnen",housingd:"Hilfe bei Wohnungssuche, Dossier und Kommunikation.",swiss:"Leben in der Schweiz",swissd:"Verstehe wichtige Schweizer Abläufe einfach erklärt."},
 ti:{hello:"እንቋዕ ናብ Nexora Swiss ብደሓን መጻእኩም",sub:"ንህይወትን ስራሕን ኣብ ስዊዘርላንድ ዝሕግዝ AI ተሓጋጋዚ።",ask:"ሎሚ ኣብ ምንታይ ክንሕግዘኩም?",cv:"CVን ማመልከቻን",cvd:"ናይ ስዊዘርላንድ CV ኣዳሉን ንስራሕ ማመልከቻ ጽሓፉን።",jobs:"ስራሕ ምድላይ",jobsd:"ዝሰማማዕ ዕድል ስራሕ ንምርካብ ሓገዝ።",docs:"ደብዳበ ምርዳእ",docsd:"ሰነድ ኣእትዉ እሞ ብቐሊሉ መብርሂ ርኸቡ።",tax:"Steuererklärung",taxd:"ናይ ካንቶን ግብሪ መግለጺ በብደረጃኡ ኣዳልዉ።",learn:"ጀርመንኛ ምምሃር",learnd:"ንስራሕን መዓልታዊ ህይወትን ዝጠቅም ጀርመንኛ ተለማመዱ።",interview:"Interview Coach",interviewd:"ናይ ስራሕ ቃለ-መሕትት ተለማመዱ።",housing:"መንበሪ",housingd:"ኣብ ምድላይ ገዛን ምልክታን ሓገዝ ርኸቡ።",swiss:"ህይወት ኣብ ስዊዘርላንድ",swissd:"ኣገደስቲ ናይ ስዊዘርላንድ መስርሓት ብቐሊሉ ተረድኡ።"}
};
const icons=["📄","💼","✉️","🇨🇭","🗣️","🎤","🏠","🧭"];
export default function Home(){
 const [lang,setLang]=useState<Lang>("en"); const t=copy[lang]; const router=useRouter();
 const cards=[[t.cv,t.cvd],[t.jobs,t.jobsd],[t.docs,t.docsd],[t.tax,t.taxd],[t.learn,t.learnd],[t.interview,t.interviewd],[t.housing,t.housingd],[t.swiss,t.swissd]];
 return <main>
  <nav><div className="brand"><span>N</span>Nexora Swiss</div><div className="langs">{(["de","en","ti"] as Lang[]).map(l=><button className={lang===l?"active":""} onClick={()=>setLang(l)} key={l}>{l==="de"?"DE":l==="en"?"EN":"ትግ"}</button>)}</div></nav>
  <section className="hero"><div className="pill">✦ AI-powered · Switzerland</div><h1>{t.hello}</h1><p>{t.sub}</p><div className="assistant"><div className="orb">N</div><div><strong>{t.ask}</strong><small>CV · Jobs · Documents · Tax · Language</small></div><button>→</button></div></section>
  <section className="services"><div className="sectionTitle"><h2>{t.ask}</h2><span>8 services</span></div><div className="grid">{cards.map((c,i)=><article key={c[0]} onClick={()=>i===0&&router.push("/cv")} className={i===0?"ready":""}><div className="icon">{icons[i]}</div><div><h3>{c[0]}</h3><p>{c[1]}</p></div><b>↗</b></article>)}</div></section>
  <footer><div><strong>Nexora Swiss</strong><span>Built for a confident start in Switzerland.</span></div><span className="dev">Development preview · v0.1</span></footer>
 </main>
}
