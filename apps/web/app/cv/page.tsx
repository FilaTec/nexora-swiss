"use client";
import {FormEvent,useState} from "react";
import Link from "next/link";
import "./cv.css";

type Lang="en"|"de"|"ti";
const tx={
en:{back:"Back to dashboard",title:"Create your Swiss CV",sub:"Tell us about yourself. You can improve everything before exporting.",personal:"Personal details",career:"Career profile",first:"First name",last:"Last name",email:"Email",phone:"Phone",city:"City / Canton",profession:"Profession or target role",summary:"About you",experience:"Work experience",education:"Education & training",skills:"Skills",languages:"Languages",save:"Save CV",preview:"Live preview",empty:"Your CV will appear here as you type.",saved:"CV saved successfully",hint:"Use one line per job, school, skill or language."},
de:{back:"Zurück zum Dashboard",title:"Deinen Schweizer CV erstellen",sub:"Erzähl uns von dir. Du kannst alles vor dem Export bearbeiten.",personal:"Persönliche Angaben",career:"Berufsprofil",first:"Vorname",last:"Nachname",email:"E-Mail",phone:"Telefon",city:"Ort / Kanton",profession:"Beruf oder gewünschte Stelle",summary:"Über dich",experience:"Berufserfahrung",education:"Ausbildung & Weiterbildung",skills:"Kenntnisse",languages:"Sprachen",save:"CV speichern",preview:"Live-Vorschau",empty:"Dein CV erscheint hier während du schreibst.",saved:"CV erfolgreich gespeichert",hint:"Eine Zeile pro Stelle, Ausbildung, Kenntnis oder Sprache."},
ti:{back:"ናብ ዋና ገጽ ተመለስ",title:"ናይ ስዊዘርላንድ CV ኣዳሉ",sub:"ብዛዕባኹም ሓበሬታ ኣእትዉ። ቅድሚ ምውጻእ ኩሉ ክትቅይሩ ትኽእሉ።",personal:"ውልቃዊ ሓበሬታ",career:"ናይ ስራሕ ሓበሬታ",first:"ስም",last:"ስም ኣቦ",email:"ኢመይል",phone:"ተሌፎን",city:"ከተማ / ካንቶን",profession:"ሞያ ወይ እትደልይዎ ስራሕ",summary:"ብዛዕባኹም",experience:"ተመኩሮ ስራሕ",education:"ትምህርትን ስልጠናን",skills:"ክእለት",languages:"ቋንቋታት",save:"CV ዓቅብ",preview:"ቀጥታ ምርኢት",empty:"ክትጽሕፉ ከለኹም CVኹም ኣብዚ ክርአ እዩ።",saved:"CV ተዓቂቡ",hint:"ንነፍሲ ወከፍ ስራሕ፣ ትምህርቲ፣ ክእለት ወይ ቋንቋ ሓደ መስመር ተጠቐሙ።"}};
const blank={first_name:"",last_name:"",email:"",phone:"",city:"",profession:"",summary:"",experience:"",education:"",skills:"",languages:""};
export default function CV(){
 const [lang,setLang]=useState<Lang>("en"),[form,setForm]=useState(blank),[status,setStatus]=useState(""); const t=tx[lang];
 const set=(k:string,v:string)=>setForm({...form,[k]:v});
 async function submit(e:FormEvent){e.preventDefault();setStatus("…");try{const r=await fetch((process.env.NEXT_PUBLIC_API_URL||"http://localhost:8000")+"/api/v1/career/cv",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});if(!r.ok)throw new Error();setStatus("✓ "+t.saved)}catch{setStatus("Could not save — check API connection");}}
 const lines=(v:string)=>v.split("\n").filter(Boolean);
 return <main className="cvShell"><header><Link href="/">← {t.back}</Link><div>{(["de","en","ti"] as Lang[]).map(l=><button key={l} className={l===lang?"on":""} onClick={()=>setLang(l)}>{l==="ti"?"ትግ":l.toUpperCase()}</button>)}</div></header>
 <section className="cvIntro"><span>CV STUDIO</span><h1>{t.title}</h1><p>{t.sub}</p></section>
 <div className="workspace"><form onSubmit={submit}>
 <h2>{t.personal}</h2><div className="two"><label>{t.first}<input required value={form.first_name} onChange={e=>set("first_name",e.target.value)}/></label><label>{t.last}<input required value={form.last_name} onChange={e=>set("last_name",e.target.value)}/></label></div>
 <div className="two"><label>{t.email}<input type="email" value={form.email} onChange={e=>set("email",e.target.value)}/></label><label>{t.phone}<input value={form.phone} onChange={e=>set("phone",e.target.value)}/></label></div>
 <label>{t.city}<input value={form.city} onChange={e=>set("city",e.target.value)}/></label>
 <h2>{t.career}</h2><label>{t.profession}<input value={form.profession} onChange={e=>set("profession",e.target.value)}/></label>
 <label>{t.summary}<textarea rows={4} value={form.summary} onChange={e=>set("summary",e.target.value)}/></label>
 {(["experience","education","skills","languages"] as const).map(k=><label key={k}>{t[k]}<textarea rows={4} value={form[k]} onChange={e=>set(k,e.target.value)}/><small>{t.hint}</small></label>)}
 <div className="saveRow"><button className="save">{t.save}</button><span>{status}</span></div></form>
 <aside><div className="previewHead"><span>{t.preview}</span><b>NEXORA CV</b></div>{form.first_name||form.last_name?<div className="paper"><h1>{form.first_name} {form.last_name}</h1><h3>{form.profession}</h3><p className="contact">{[form.city,form.phone,form.email].filter(Boolean).join(" · ")}</p>{form.summary&&<p className="summary">{form.summary}</p>}{[["EXPERIENCE",form.experience],["EDUCATION",form.education],["SKILLS",form.skills],["LANGUAGES",form.languages]].map(([h,v])=>v&&<section key={h}><h4>{h}</h4>{lines(v).map((x,i)=><p key={i}>• {x}</p>)}</section>)}</div>:<div className="empty">{t.empty}</div>}</aside>
 </div></main>}
