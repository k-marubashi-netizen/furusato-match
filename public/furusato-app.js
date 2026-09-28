/* ================= ふるさとマッチ (demo app) ================= */

/* ---------- inline icons (no emoji) ---------- */
const IC={
 logo:'<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C7.9 2 4.5 5.4 4.5 9.5c0 5.3 7.5 12 7.5 12s7.5-6.7 7.5-12C19.5 5.4 16.1 2 12 2zM12 6.2 8.4 9.1V13h7.2V9.1L12 6.2z" fill="currentColor"/></svg>',
 pin:'<svg viewBox="0 0 24 24" class="i"><path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>',
 cal:'<svg viewBox="0 0 24 24" class="i"><rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/></svg>',
 clock:'<svg viewBox="0 0 24 24" class="i"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>',
 coin:'<svg viewBox="0 0 24 24" class="i"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v9M9.5 10h3.2a1.6 1.6 0 010 3.2H9.5"/></svg>',
 pen:'<svg viewBox="0 0 24 24" class="i"><path d="M4 20l4-1L19 8a2 2 0 00-3-3L5 16l-1 4z"/></svg>',
 star:'<svg viewBox="0 0 24 24" class="i"><path d="M12 4l2.3 4.9 5.2.6-3.9 3.6 1.1 5.3L12 16.9 7.2 18.4l1.1-5.3-3.9-3.6 5.2-.6z"/></svg>',
 starF:'<svg viewBox="0 0 24 24" class="i fill"><path d="M12 4l2.3 4.9 5.2.6-3.9 3.6 1.1 5.3L12 16.9 7.2 18.4l1.1-5.3-3.9-3.6 5.2-.6z"/></svg>',
 leaf:'<svg viewBox="0 0 24 24" class="i"><path d="M5 19c0-8 6-13 14-13 0 8-5 14-13 14M8 16c2-3 4-5 7-6.5"/></svg>',
 cup:'<svg viewBox="0 0 24 24" class="i"><path d="M4 8h13v4a5 5 0 01-5 5H9a5 5 0 01-5-5zM17 9h2.2a2.3 2.3 0 010 4.6H17M6 3.5c0 1-.8 1.3-.8 2.3M10 3.5c0 1-.8 1.3-.8 2.3"/></svg>',
 chat:'<svg viewBox="0 0 24 24" class="i"><path d="M4 5.5h16v11H9l-4 4v-4H4z"/></svg>',
 globe:'<svg viewBox="0 0 24 24" class="i"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.6 2.5 14.4 0 17M12 3.5c-2.5 2.6-2.5 14.4 0 17"/></svg>',
 plus:'<svg viewBox="0 0 24 24" class="i"><path d="M12 5v14M5 12h14"/></svg>',
 minus:'<svg viewBox="0 0 24 24" class="i"><path d="M5 12h14"/></svg>',
 target:'<svg viewBox="0 0 24 24" class="i"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.4"/></svg>',
 check:'<svg viewBox="0 0 24 24" class="i"><path d="M5 12.5l4.5 4.5L19 7"/></svg>',
 bell:'<svg viewBox="0 0 24 24" class="i"><path d="M6 9a6 6 0 0112 0c0 5 2 6 2 6H4s2-1 2-6zM10 20a2 2 0 004 0"/></svg>',
 search:'<svg viewBox="0 0 24 24" class="i"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.2-3.2"/></svg>'
};
const LOGO=`<span style="color:#fff;display:inline-flex">${IC.logo}</span>`;
const LOGOG=`<span style="color:var(--green)" class="logo">${IC.logo}</span>`;

/* ---------- seed data ---------- */
function seed(){return{
 version:10,
 regions:[
  {id:'otari',name:'小谷村',pref:'長野県',prefId:'nagano',status:'certified',stamps:3,photo:'/events/event-1.png',
   blurb:'雪国の里山。田んぼの畦道と山の恵み、湯けむりの暮らし。',
   theme:['自然','暮らし','祭り'],
   reflection:{culture:true,life:true,manner:true,nature:true},
   experiences:['山口さんと畦道さんぽ','郷土料理づくりを教わった','雪囲いの意味を聞いた']},
  {id:'noto',name:'能登町',pref:'石川県',prefId:'ishikawa',status:'learning',stamps:2,photo:'/events/event-2.png',
   blurb:'海と発酵食の町。朝市の賑わいと、移住者が見つけた能登。',
   theme:['食','自然','暮らし'],
   reflection:{culture:true,life:true,manner:false,nature:false},
   experiences:['朝市を一緒に歩いた']},
  {id:'miyama',name:'南丹市美山町',pref:'京都府',prefId:'kyoto',status:'learning',stamps:1,photo:'/events/event-3.png',
   blurb:'かやぶきの里。囲炉裏を囲む夜、暮らしと文化の語らい。',
   theme:['文化','暮らし','自然'],
   reflection:{culture:true,life:false,manner:true,nature:false},
   experiences:['囲炉裏で暮らしトーク']},
  {id:'yame',name:'八女市',pref:'福岡県',prefId:'fukuoka',status:'new',stamps:0,photo:'/events/yame.png',
   blurb:'八女茶の里。茶畑と、近隣から通う学生ガイドの案内。',
   theme:['食','自然','文化'],reflection:{},experiences:[]},
  {id:'higashikawa',name:'東川町',pref:'北海道',prefId:'hokkaido',status:'new',stamps:0,photo:'/events/higashikawa.png',
   blurb:'大雪山の水と写真の町。移住者が語る北の暮らし。',
   theme:['自然','暮らし'],reflection:{},experiences:[]},
  {id:'shimanto',name:'四万十町',pref:'高知県',prefId:'kochi',status:'new',stamps:0,photo:'/events/shimanto.png',
   blurb:'清流四万十。沈下橋と川の恵み、家庭の味。',
   theme:['自然','食'],reflection:{},experiences:[]}
 ],
 guides:[
  {id:'g1',region:'otari',name:'山口 誠',origin:'resident',img:'/guides/guide-1.png',langs:['日本語'],
   spec:['里山の歩き方','郷土料理','地域のマナー'],relation:'この谷で生まれ育って60年。',
   lang_note:'日本語のみ対応で、英語などは話せません。翻訳機を通せば、言葉が違う方とも安心してやりとりできます。'},
  {id:'g2',region:'noto',name:'田村 さやか',origin:'other',img:'/guides/guide-2.png',langs:['日本語','English'],
   spec:['朝市めぐり','発酵食','暮らし'],relation:'東京から移住して7年。よそ者だった私だから話せる能登。',
   lang_note:'英語もOK。練習中の方は、ぜひ気軽に英語で話しかけてください。'},
  {id:'g3',region:'miyama',name:'小林 久子',origin:'resident',img:'/guides/guide-4.png',langs:['日本語'],
   spec:['囲炉裏の暮らし','季節の行事','家庭料理'],relation:'美山で三世代。おかえりと言える家です。',
   lang_note:'日本語のみ対応です。英語などは話せませんが、翻訳機を通せば言葉が違っても大丈夫。ゆっくりお話しします。'},
  {id:'g4',region:'miyama',name:'Marie（マリー）',origin:'overseas',img:'/people/emma.png',langs:['日本語','English','Français'],
   spec:['文化の背景を通訳','写真さんぽ'],relation:'フランス出身。美山に暮らして4年、学んだ文化を母語でも伝えます。',
   lang_note:'英語・フランス語で、文化の背景まで母語で通訳できます。'},
  {id:'g5',region:'yame',name:'中村 陽介',origin:'other',img:'/guides/guide-3.png',langs:['日本語','English'],
   spec:['茶畑体験','商店街さんぽ'],relation:'近隣の大学に通いながら八女を学ぶ2年目。',
   lang_note:'英語で気軽に。英語を話したい人の練習相手にもなります。'}
 ],
 board:[
  {id:'b1',region:'otari',type:'event',title:'里山の畦道さんぽと保存食づくり',img:'/events/event-1.png',
   body:'田んぼの畦道を歩き、地域の方に雪国の暮らしと山の恵みを教わります。採れた食材で小さな保存食も。',
   date:'2026-10-03',time:'15:00〜17:00',place:'小谷村公民館 集合',apply:'回覧板から参加希望（デモ）',
   publisher:'小谷の地域メンバー',fee:'500円',langs:['日本語'],people:['/people/lucas.png','/people/sofia.png']},
  {id:'b2',region:'noto',type:'event',title:'朝市で朝ごはん。能登の食卓を知る',img:'/events/event-2.png',
   body:'地元の人と朝市を歩き、旬の魚や発酵食を選んで、一緒に小さな朝ごはんを囲みます。',
   date:'2026-10-04',time:'8:00〜10:00',place:'能登町 朝市周辺',apply:'回覧板から参加希望（デモ）',
   publisher:'能登の住民・飲食店メンバー',fee:'1,200円',langs:['日本語','English'],people:['/people/sofia.png','/people/mei.png']},
  {id:'b3',region:'miyama',type:'event',title:'美山の夜、囲炉裏で暮らしトーク',img:'/events/event-3.png',
   body:'囲炉裏を囲み、季節の行事やご近所づきあい、暮らしの知恵を気軽に語り合います。',
   date:'2026-10-10',time:'18:00〜19:30',place:'美山町 地域交流館',apply:'回覧板から参加希望（デモ）',
   publisher:'美山の地域メンバー',fee:'無料',langs:['日本語','English','Français'],people:['/people/emma.png','/people/lucas.png','/people/mei.png']},
  {id:'b4',region:'noto',type:'news',title:'朝市通りの魚屋さん、秋の新物が並びはじめました',
   body:'涼しくなり、朝市に秋の魚が並びはじめました。離れて暮らす皆さんも、次に帰るときの楽しみにどうぞ。',
   publisher:'能登の回覧板メンバー'},
  {id:'b5',region:'otari',type:'news',title:'棚田が黄金色に。稲刈りが始まります',
   body:'小谷の棚田が色づきました。今年も無事に実りの季節です。写真を撮りにだけでも、ぜひ「ただいま」を。',
   publisher:'小谷の地域メンバー'},
  {id:'b6',region:'miyama',type:'news',title:'かやぶき屋根の葺き替え、今年も無事に',
   body:'集落のかやぶき屋根の葺き替えが行われました。受け継がれる技と手間を、次に来る人にも伝えたいです。',
   publisher:'美山の世代交流メンバー'}
 ],
 saved:[],
 joined:[],
 threads:[
  {id:'t-g1',guideId:'g1',region:'otari',msgs:[
    {who:'them',text:'おかえりなさい。今年の棚田、きれいに色づきましたよ。次はいつ帰ってこられますか？',
     en:'Welcome home. The rice terraces have turned a beautiful gold this year. When can you visit next?'},
    {who:'me',text:'稲刈りの頃にまた伺いたいです。畦道さんぽ、楽しみにしています。',
     en:'I’d love to come again around the rice harvest. I’m looking forward to the footpath walk.'},
    {who:'them',text:'お待ちしています。長靴だけ用意してくださいね。',
     en:'We’ll be waiting. Just bring a pair of rubber boots.'}
  ]},
  {id:'t-g2',guideId:'g2',region:'noto',msgs:[
    {who:'me',text:'朝市に初めて行きます。何時ごろが一番賑わいますか？',
     en:'It’s my first time at the morning market. What time is it busiest?'},
    {who:'them',text:'8時前後がいちばん活気があります。まず一緒に一周しましょう。',
     en:'It gets busiest around 8 a.m. Let’s walk through it together first.'},
    {who:'me',text:'ありがとうございます。発酵食も教えてください。',
     en:'Thank you. Please tell me about the fermented foods too.'},
    {who:'them',text:'もちろん。いしる（魚醤）のお店に案内しますね。',
     en:'Of course. I’ll take you to a shop that makes ishiru, the local fish sauce.'}
  ]},
  {id:'t-g4',guideId:'g4',region:'miyama',msgs:[
    {who:'them',text:'Bonjour! 美山へようこそ。かやぶきの里を写真さんぽしましょう。',
     en:'Bonjour! Welcome to Miyama. Let’s take a photo walk through the thatched-roof village.'},
    {who:'me',text:'囲炉裏の文化についても知りたいです。',
     en:'I’d also like to learn about the culture of the irori hearth.'},
    {who:'them',text:'いいですね。火のまわりの作法から、暮らしの知恵までお話しします。',
     en:'Wonderful. I’ll explain everything from the etiquette around the hearth to the wisdom of daily life here.'}
  ]}
 ],
 requests:[
  {id:'rq1',region:'otari',name:'Lucas',img:'/people/lucas.png',origin:'overseas',langs:['English'],
   text:'はじめまして。小谷村を案内してほしいです。畦道さんぽと、雪国の暮らしに興味があります。10月に行けます。',
   en:'Hello! I’d love a guide in Otari. I’m interested in the footpath walk and snow-country life. I can come in October.'},
  {id:'rq2',region:'otari',name:'Mei',img:'/people/mei.png',origin:'overseas',langs:['日本語','English'],
   text:'こんにちは。郷土料理づくりを体験したいです。翻訳機も使えます。よろしくお願いします。',
   en:'Hi! I’d like to try making local cuisine. I can use a translation device too. Thank you!'}
 ],
 goalGuide:{otari:true},
 me:{name:'あなた',handle:'furusato_you',bio:'ふるさとを増やしています。次に「ただいま」と言いに行く場所を探し中。',img:'/people/me.png'}
}}

/* ---------- state / storage ---------- */
const KEY='furusato-match-v10';
let S=load();
function load(){try{const r=localStorage.getItem(KEY);if(r){const o=JSON.parse(r);if(o&&o.version===10){if(o.me&&!o.me.img)o.me.img='/people/me.png';return o;}}}catch(e){}return seed();}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
function resetAll(){S=seed();save();go('home');toast('デモを初期状態に戻しました');}

/* ---------- helpers ---------- */
const $=s=>document.querySelector(s);
const region=id=>S.regions.find(r=>r.id===id);
const guide=id=>S.guides.find(g=>g.id===id);
const guidesOf=id=>S.guides.filter(g=>g.region===id);
const boardOf=id=>S.board.filter(b=>b.region===id);
const certified=()=>S.regions.filter(r=>r.status==='certified');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const WD=['日','月','火','水','木','金','土'];
function fdate(iso){if(!iso)return'';const d=new Date(iso+'T00:00:00');return `${d.getMonth()+1}月${d.getDate()}日(${WD[d.getDay()]})`;}
const originLabel={resident:'昔からの住民',other:'他地域から関わる人',overseas:'海外にルーツ'};
const statusMeta={certified:{t:'ふるさと認定済み',cls:'gold'},learning:{t:'交流・学習中',cls:'learn'},new:{t:'これから知る',cls:'new'}};
const statusColor={certified:'var(--gold)',learning:'var(--shu)',new:'var(--surface)'};
let toastT;
function toast(m){const t=$('#toast');t.innerHTML=m;t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('show'),2100);}
function avatar(src,alt,cls){return src?`<img class="avatar ${cls||''}" src="${src}" alt="${esc(alt||'')}" loading="lazy">`:`<span class="avatar ph ${cls||''}">${IC.pin}</span>`;}
/* ---- ふるさとスタンプ (pin+house rubber-stamp, resembles app icon) ---- */
const STAMP_MAX=3;
const STAMP_PIN='M12 2C7.9 2 4.5 5.4 4.5 9.5c0 5.3 7.5 12 7.5 12s7.5-6.7 7.5-12C19.5 5.4 16.1 2 12 2zM12 6.2 8.4 9.1V13h7.2V9.1L12 6.2z';
function stampSVG(filled){
 return filled
  ? `<span class="stamp on"><svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="18" fill="var(--gold-tint)" stroke="var(--gold-deep)" stroke-width="1.7"/><circle cx="20" cy="20" r="14.3" fill="none" stroke="var(--gold-deep)" stroke-width="0.8" stroke-dasharray="1.6 1.6" opacity=".75"/><g transform="translate(20 21) scale(0.8) translate(-12 -12)"><path d="${STAMP_PIN}" fill="var(--gold-deep)"/></g></svg></span>`
  : `<span class="stamp"><svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="18" fill="none" stroke="var(--line)" stroke-width="1.7" stroke-dasharray="3 3"/><g transform="translate(20 21) scale(0.8) translate(-12 -12)"><path d="${STAMP_PIN}" fill="var(--line)" opacity=".85"/></g></svg></span>`;
}
function stampRow(n,showCount){n=Math.max(0,Math.min(STAMP_MAX,n||0));
 return `<span class="stamprow">${[0,1,2].map(i=>stampSVG(i<n)).join('')}${showCount?`<span class="stampcount">${n}/${STAMP_MAX}</span>`:''}</span>`;}
function stampMini(n){n=Math.max(0,Math.min(STAMP_MAX,n||0));
 return `<span class="stampmini">${[0,1,2].map(i=>`<i class="${i<n?'on':''}"></i>`).join('')}<span>${n}/${STAMP_MAX}</span></span>`;}
/* ---- language helpers ---- */
const langCls=l=>/日本語/.test(l)?'ja':/English|英語/.test(l)?'en':/Français|フランス/.test(l)?'fr':'ot';
function langChips(langs,translator){
 let h=(langs||[]).map(l=>`<span class="lang ${langCls(l)}">${esc(l)}</span>`).join('');
 if(translator!==false)h+=`<span class="lang tr">${IC.globe} 翻訳機で全言語対応</span>`;
 return `<span class="langrow">${h}</span>`;
}

/* ---------- nav / routing ---------- */
let view='home';
const TABS=[
 {id:'home',label:'ホーム',ic:'M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10'},
 {id:'map',label:'マップ',ic:'M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14'},
 {id:'board',label:'回覧板',ic:'M4 5h16v14H4zM8 9h8M8 13h8M8 17h5'},
 {id:'msg',label:'メッセージ',ic:'M4 5h16v11H9l-4 4z'},
 {id:'my',label:'マイページ',ic:'M4 20a8 8 0 0116 0M12 11a4 4 0 100-8 4 4 0 000 8z'}
];
let openThread=null; // guideId of the message thread being viewed (LINE-style), null = list
let autoTr=false;    // auto-translate all messages in the open chat (facade)
let searchRegion='all', searchLang='all'; // guide search filters
function nav(){const pend=pendingReqs().length;
 $('#nav').innerHTML=TABS.map(t=>`<button data-tab="${t.id}" class="${t.id===view?'on':''}">
 <span class="navic">${(t.id==='msg'&&pend)?`<span class="navbadge">${pend}</span>`:''}<svg class="ic" viewBox="0 0 24 24"><path d="${t.ic}"/></svg></span>${t.label}</button>`).join('');}
function go(v,keepMsg){if(!(v==='msg'&&keepMsg))openThread=null;view=v;render();$('#main').scrollTop=0;try{window.scrollTo(0,0);}catch(e){}}

/* ---------- render ---------- */
function render(){
 nav();
 const m=$('#main');
 m.innerHTML=({home:homeView,map:mapView,board:boardView,msg:msgView,my:myView}[view])();
 const chatting=(view==='msg'&&openThread);
 m.classList.toggle('chat',!!chatting);
 if(view==='map')initMap();
 if(chatting){const sc=$('#chatscroll');if(sc)sc.scrollTop=sc.scrollHeight;}
}

/* ===== HOME ===== */
function homeView(){
 return `
 <div class="hero photo" style="background-image:linear-gradient(180deg,rgba(28,58,44,.55),rgba(28,58,44,.82)),url('/events/hero-village.png')">
   <div style="display:flex;align-items:center;gap:8px">${LOGO}
     <div><div style="font-family:'Zen Maru Gothic';font-weight:700;font-size:15px">ふるさとマッチ</div>
     <div style="font-size:10.5px;color:#e7f5ec">デモ試作品・ブラウザ内で動作します</div></div></div>
   <h1 style="margin-top:18px">誰もが、ふるさとにできる。</h1>
   <div class="lead">出会いから、ふるさとが増えていく。<br>住む場所も国籍も問いません。ガイドとして案内するのは、希望する人だけ。</div>
   <div style="display:flex;gap:8px;margin-top:18px">
     <button class="btn gold sm" data-go="map">マップでふるさとを見る</button>
     <button class="btn ghost sm" data-act="findGuide" style="background:#ffffff1f;color:#fff;border-color:#ffffff88">地域とガイドを探す</button>
   </div>
 </div>

 <div class="pad" style="margin-top:18px">
   <div class="card" style="padding:14px 15px">
     <div class="eyebrow">だれでも主役</div>
     <p style="margin:6px 0 0;font-size:13.5px">地域に住む人も、他地域に住む人も、海外から訪れた人も。立場を固定せず、
     どんな組み合わせでも交流できます。共通の“ふるさと”を通じて出会い、その土地のことを知り、親しみを深めます。</p>
   </div>
 </div>

 <div class="pad" style="margin-top:14px">
   <div class="card langcard">
     <div class="eyebrow" style="color:var(--blue)">${IC.globe} 言語の壁を越える</div>
     <p style="margin:7px 0 10px;font-size:13.5px">「何語を話せるか」をプロフィールに表示。イベントも“何語で行うか”がわかります。
     翻訳機で全言語に対応するので、言葉が違っても参加できます。</p>
     <div class="langfeat">
       <div><span class="lang ja">日本語のみ対応</span><p>英語などは話せないガイドとも、翻訳機を通して交流できます。日本語だけの交流も歓迎です。</p></div>
       <div><span class="lang en">${IC.globe} 英語を話したい</span><p>英語対応のガイドや参加者と、積極的に英語で話せます。</p></div>
       <div><span class="lang tr">${IC.globe} 翻訳機で全言語対応</span><p>対応言語がなくても、翻訳機を介してその場で会話できます。</p></div>
     </div>
   </div>
 </div>

 <div class="pad" style="margin-top:20px">
   <div class="eyebrow">つかいかた</div>
   <h2 class="sec-t">出会いから、ふるさとになるまで</h2>
   <div class="card" style="padding:6px 15px;margin-top:10px">
     ${[
       ['1','地域や人を見つける','地域・関心・対応言語から、地域とふるさとガイドを探します。'],
       ['2','マッチングして地域を知る','一緒にまちを歩き、名所だけでなくマナー・文化・暮らし・自然を知ります。'],
       ['3','スタンプを3つ集めて認定','ガイドと交流して“ふるさとスタンプ”を3つ集めると、その地域が“ふるさと”になります。'],
       ['4','認定後の二つの過ごし方','ふるさととして楽しむか、希望すればガイドとして案内するか、選べます。']
     ].map(s=>`<div class="step"><div class="n">${s[0]}</div><div><div style="font-weight:700">${s[1]}</div>
       <div class="muted" style="font-size:12.5px">${s[2]}</div></div></div>`).join('')}
   </div>
   <p class="muted" style="font-size:12px;margin-top:8px">※ ガイドになることは全員の目標ではありません。まずは“自分のふるさと”を増やすところから。</p>
 </div>

 <div class="pad" style="margin-top:20px">
   <div class="eyebrow">いま出会えるふるさと</div>
   <h2 class="sec-t" style="margin-bottom:10px">地域とガイド</h2>
   <button class="btn block" data-act="findGuide" style="margin-bottom:10px">${IC.search} ガイドを探す（地域・言語で検索）</button>
   ${S.regions.slice(0,3).map(regionRow).join('')}
   <button class="btn ghost block sm" data-go="map" style="margin-top:4px">すべての地域を見る</button>
 </div>

 <div class="pad" style="margin-top:20px">
   <div class="card" style="padding:15px;background:var(--green-tint);border-color:transparent">
     <div class="eyebrow">わたしのふるさと</div>
     <div style="display:flex;align-items:baseline;gap:8px;margin-top:4px">
       <span class="gcount">${certified().length}</span><span style="font-weight:700">か所が“ふるさと認定”</span></div>
     <p class="muted" style="font-size:12.5px;margin:6px 0 10px">こんなふるさとは、何個あってもいい。地図で金色の目印を増やしていきましょう。</p>
     <button class="btn sm" data-go="map">マップを開く</button>
   </div>
 </div>

 <div class="pad" style="margin-top:20px">
   <details class="card" style="padding:14px 15px">
     <summary style="font-weight:700;cursor:pointer">このアプリが生まれた背景</summary>
     <p style="font-size:13px;margin:10px 0 0">私は大学進学で上京しています。地元に帰ると安心でき、充実した時間を過ごせます。ふるさとは心のよりどころ。
     こんなふるさとは、何個あってもいいなと思いました。</p>
     <p style="font-size:13px;margin:8px 0 0">生まれ育った場所以外にも、ふるさとはつくれるはず。その土地の暮らしを知り、また会いたい人ができれば、
     初めての場所も安心して帰れる場所になります。地域を知り人と親しくなる交流は、文化やマナーの行き違いをやわらげる助けにもなります。
     そこで、出会いの入り口としてマッチングアプリに着目しました。</p>
   </details>
 </div>

 <div class="pad" style="margin-top:16px">
   <p class="muted" style="font-size:11px">生成AIの使用について：文章の整理・推敲や試作品の作成に、ChatGPTとClaudeを使用しました。<br>
   ※ 表示中の人物・地域・イベント・ニュースはすべてデモ用のサンプルです。</p>
 </div>`;
}

/* region list row with photo thumb */
function regionRow(r){
 const g=guidesOf(r.id)[0];
 const thumb=r.photo?`<img class="rowimg" src="${r.photo}" alt="${esc(r.name)}" loading="lazy">`
   :`<span class="rowimg ph">${IC.pin}</span>`;
 return `<button class="card rowcard" data-region="${r.id}">
   ${thumb}
   <span class="rowbody">
     <span class="rowtop"><span class="pill ${statusMeta[r.status].cls}" style="font-size:10px">${statusMeta[r.status].t}</span>${stampMini(r.stamps)}</span>
     <span class="rowtitle">${r.pref}・${r.name}</span>
     <span class="muted rowsub">${esc(r.blurb)}</span>
     ${g?`<span class="muted rowguide">${avatar(g.img,g.name,'xs')}<span>${esc(g.name)}／${originLabel[g.origin]}</span></span>`:''}
   </span></button>`;
}

/* ===== MAP ===== */
let mapK=1,mapX=0,mapY=0,mapActive=[];
const VBW=438,VBH=516;
function mapView(){
 return `
 <div class="hd">${LOGOG}<div style="flex:1"><h1>マップ</h1><div class="sub">認定した“ふるさと”が金色に増えていきます</div></div>
   <button class="hdbtn" data-act="findGuide" aria-label="ガイドを探す">${IC.search}</button></div>
 <div class="pad" style="margin-top:12px">
   <div class="card mapcard">
     <div class="mapwrap">
       <svg id="jpmap" viewBox="0 0 ${VBW} ${VBH}" role="img" aria-label="日本地図（47都道府県）">
         <g id="jpg"></g>
       </svg>
       <div class="mapctrl">
         <button data-zoom="in" aria-label="拡大">${IC.plus}</button>
         <button data-zoom="out" aria-label="縮小">${IC.minus}</button>
         <button data-zoom="reset" aria-label="リセット">${IC.target}</button>
       </div>
     </div>
     <div class="legend" style="justify-content:center;padding:10px 0 4px">
       <span><i style="background:var(--gold);border:1px solid var(--gold-deep)"></i>ふるさと認定済み</span>
       <span><i style="background:var(--shu)"></i>交流・学習中</span>
       <span><i style="background:var(--surface);border:1px solid var(--ink-soft)"></i>これから知る</span>
     </div>
   </div>
   <p class="muted" style="font-size:11px;margin-top:8px">色のついた都道府県に、いま交流できる地域があります。ピンチ・スクロール・＋−ボタンで拡大でき、ドラッグで移動できます。目印を押すと詳細が開きます。</p>

   <div style="display:flex;align-items:baseline;gap:8px;margin:16px 4px 10px">
     <span class="gcount" style="font-size:26px">${certified().length}</span>
     <span style="font-weight:700">か所の“ふるさと”／全${S.regions.length}地域</span>
   </div>
   ${S.regions.map(regionRow).join('')}
 </div>`;
}

function initMap(){
 const svg=$('#jpmap'),g=$('#jpg');
 if(!svg||!g||!window.JAPAN_MAP)return;
 const M=window.JAPAN_MAP;
 const activeByPref={};S.regions.forEach(r=>{activeByPref[r.prefId]=r;});
 // prefecture paths
 let paths=M.locations.map(loc=>{
   const r=activeByPref[loc.id];
   const fill=r?statusColor[r.status]:'var(--map-idle)';
   const stroke=r?(r.status==='certified'?'var(--gold-deep)':r.status==='learning'?'#b4573a':'var(--ink-soft)'):'var(--map-line)';
   return `<path d="${loc.path}" fill="${fill}" stroke="${stroke}" stroke-width="${r?0.9:0.5}"
     ${r?`data-region="${r.id}" class="prf act"`:'class="prf"'}><title>${loc.name}</title></path>`;
 }).join('');
 g.innerHTML=paths+'<g id="jppins"></g>';
 // pins/labels at active prefecture centroids (counter-scaled)
 const pins=$('#jppins');mapActive=[];
 g.querySelectorAll('path.act').forEach(p=>{
   let bb;try{bb=p.getBBox();}catch(e){return;}
   const r=region(p.dataset.region);
   const cx=bb.x+bb.width/2, cy=bb.y+bb.height/2;
   mapActive.push({cx,cy,r});
 });
 pins.innerHTML=mapActive.map(a=>{
   const r=a.r;const gold=r.status==='certified';
   const fill=statusColor[r.status], stroke=gold?'#7a5a12':r.status==='learning'?'#b4573a':'var(--ink-soft)';
   const dot=gold?'#7a5a12':'#fff';
   return `<g class="pin" data-region="${r.id}" transform="translate(${a.cx},${a.cy})" style="cursor:pointer">
     <g class="pinInner">
       <path d="M0 0 C-4.6 -5.6 -7 -8.6 -7 -12 A7 7 0 1 1 7 -12 C7 -8.6 4.6 -5.6 0 0 Z" fill="${fill}" stroke="${stroke}" stroke-width="1.3"/>
       <circle cx="0" cy="-12" r="2.7" fill="${dot}"/>
       <text x="0" y="7.5" text-anchor="middle" font-size="7" font-weight="700" fill="var(--ink)" font-family="Noto Sans JP" paint-order="stroke" stroke="var(--bg)" stroke-width="2">${r.name}</text>
     </g>
   </g>`;
 }).join('');
 mapK=1;mapX=0;mapY=0;applyT();
 // interactions
 const ptrs=new Map();let pinchD=0,dragging=false,last=null;
 const toUser=(cx,cy)=>{const ctm=svg.getScreenCTM();const pt=svg.createSVGPoint();pt.x=cx;pt.y=cy;const p=pt.matrixTransform(ctm.inverse());return p;};
 function zoomAt(cx,cy,factor){
   const p=toUser(cx,cy);const nk=Math.max(1,Math.min(7,mapK*factor));
   const ux=(p.x-mapX)/mapK, uy=(p.y-mapY)/mapK;
   mapX=p.x-ux*nk; mapY=p.y-uy*nk; mapK=nk; applyT();
 }
 svg.addEventListener('wheel',e=>{e.preventDefault();zoomAt(e.clientX,e.clientY,e.deltaY<0?1.15:1/1.15);},{passive:false});
 svg.addEventListener('pointerdown',e=>{svg.setPointerCapture(e.pointerId);ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY});
   if(ptrs.size===1){dragging=true;last=toUser(e.clientX,e.clientY);}
   else if(ptrs.size===2){dragging=false;const a=[...ptrs.values()];pinchD=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);}});
 svg.addEventListener('pointermove',e=>{
   if(!ptrs.has(e.pointerId))return;ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY});
   if(ptrs.size===2){const a=[...ptrs.values()];const d=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);
     if(pinchD){zoomAt((a[0].x+a[1].x)/2,(a[0].y+a[1].y)/2,d/pinchD);}pinchD=d;return;}
   if(dragging&&last){const p=toUser(e.clientX,e.clientY);mapX+=p.x-last.x;mapY+=p.y-last.y;last=toUser(e.clientX,e.clientY);
     // recompute last after transform so delta stays stable
     applyT();last=toUser(e.clientX,e.clientY);}
 });
 const up=e=>{ptrs.delete(e.pointerId);if(ptrs.size<2)pinchD=0;if(ptrs.size===0)dragging=false;
   if(ptrs.size===1){const v=[...ptrs.values()][0];last=toUser(v.x,v.y);dragging=true;}};
 svg.addEventListener('pointerup',up);svg.addEventListener('pointercancel',up);svg.addEventListener('pointerleave',up);
 $('.mapctrl').addEventListener('click',e=>{const b=e.target.closest('[data-zoom]');if(!b)return;
   const z=b.dataset.zoom;const cx=svg.getBoundingClientRect().left+svg.clientWidth/2, cy=svg.getBoundingClientRect().top+svg.clientHeight/2;
   if(z==='in')zoomAt(cx,cy,1.4);else if(z==='out')zoomAt(cx,cy,1/1.4);else{mapK=1;mapX=0;mapY=0;applyT();}});
}
function applyT(){
 // clamp translate so map stays in view
 const g=$('#jpg');if(!g)return;
 const maxX=0,minX=VBW-VBW*mapK, maxY=0,minY=VBH-VBH*mapK;
 mapX=Math.min(maxX,Math.max(minX,mapX));mapY=Math.min(maxY,Math.max(minY,mapY));
 g.setAttribute('transform',`translate(${mapX} ${mapY}) scale(${mapK})`);
 const inv=1/mapK;document.querySelectorAll('#jppins .pinInner').forEach(pi=>pi.setAttribute('transform',`scale(${inv})`));
}

/* ===== region detail sheet ===== */
function openRegion(id){
 const r=region(id);const gs=guidesOf(id);const bd=boardOf(id);
 const st=statusMeta[r.status];
 const hero=r.photo?`<div class="rhero" style="background-image:url('${r.photo}')"></div>`
   :`<div class="rhero grad"></div>`;
 const sn=r.stamps||0;
 let cert='';
 if(r.status==='certified'){
   cert=`<div class="card stampcard gold">
     <div class="pill gold">${IC.starF} ふるさと認定済み</div>
     <p style="font-size:13px;margin:8px 0 10px">ガイドからスタンプを3つ集めました。この地域はあなたの“ふるさと”です。</p>
     <div class="stampbox">${stampRow(3)}</div>
     <p class="muted" style="font-size:12px;margin:10px 0 10px">認定後の過ごし方を選べます。</p>
     <div class="two">
       <button class="btn sm block" data-act="enjoy" data-region="${id}">ふるさととして楽しむ</button>
       <button class="btn ghost sm block" data-act="aimGuide" data-region="${id}">ガイドとして案内する</button>
     </div>
     <p class="muted" style="font-size:11px;margin-top:8px">イベント参加は任意です。ガイドとして案内するのは、希望する人だけです。</p>
   </div>`;
 }else{
   const learning=r.status==='learning';
   cert=`<div class="card stampcard ${learning?'learn':''}">
     <div class="pill ${learning?'learn':'new'}">${learning?'ふるさとスタンプ 集め中':'これから知る地域'}</div>
     <p style="font-size:13px;margin:8px 0 10px">ガイドと交流して<b>ふるさとスタンプを3つ</b>集めると、この地域が“ふるさと”になります。</p>
     <div class="stampbox">${stampRow(sn,true)}</div>
     <button class="btn gold block" data-act="stampGet" data-region="${id}" style="margin-top:12px">${IC.starF} ガイドからスタンプをもらう <span class="demo">デモ</span></button>
     <p class="muted" style="font-size:11px;margin-top:8px">${sn>=STAMP_MAX-1?'あと1つで“ふるさと認定”です。':'スタンプはガイドとの交流・体験で1つずつ増えます。'}実運用では地域と基準を調整します。</p>
   </div>`;
 }
 const html=`
  <button class="x" data-close>×</button>
  ${hero}
  <div style="margin-top:10px">
    <div class="eyebrow">${r.pref}</div>
    <h2 style="font-size:22px">${r.name}
      <span class="pill ${st.cls}" style="font-size:11px;vertical-align:middle">${st.t}</span></h2>
    <p class="muted" style="font-size:13px;margin:6px 0 0">${esc(r.blurb)}</p>
    <div style="margin-top:6px">${r.theme.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
  </div>
  <div class="stampstrip">
    <div class="stampstriptop"><span>この地域のふるさとスタンプ</span><span class="stampcount">${sn}/${STAMP_MAX}</span></div>
    ${stampRow(sn)}
  </div>
  ${(()=>{const ls=[...new Set(guidesOf(id).flatMap(g=>g.langs||[]))];return ls.length?`
  <div class="langbox">
    <div class="langlabel">${IC.globe} この地域で使える言語</div>
    ${langChips(ls)}
    <p class="langnote" style="margin-top:7px">日本語しか話せなくても大丈夫。翻訳機の使い方はガイドが案内します。英語を話したい人は、英語対応のガイドと積極的に話せます。</p>
  </div>`:''})()}
  <div style="margin-top:14px">${cert}</div>

  <h3 style="font-size:15px;margin:18px 0 8px">この地域のふるさとガイド</h3>
  ${gs.length?gs.map(g=>guideCard(g)).join(''):'<p class="muted" style="font-size:13px">ガイドは準備中です。</p>'}

  <h3 style="font-size:15px;margin:18px 0 8px">回覧板（この地域）</h3>
  ${bd.length?bd.slice(0,3).map(boardMini).join(''):'<p class="muted" style="font-size:13px">お知らせはまだありません。</p>'}
  <button class="btn ghost sm" data-act="boardRegion" data-region="${id}" style="margin-top:6px">回覧板でこの地域を見る</button>

  <h3 style="font-size:15px;margin:18px 0 8px">体験記録</h3>
  ${(r.experiences&&r.experiences.length)?('<ul style="margin:0;padding-left:18px;font-size:13px">'+r.experiences.map(e=>`<li>${esc(e)}</li>`).join('')+'</ul>'):'<p class="muted" style="font-size:13px">まだ記録がありません。ガイドと交流すると増えていきます。</p>'}
 `;
 openSheet(html);
}
function guideCard(g,showRegion){
 const r=showRegion?region(g.region):null;
 return `<div class="card guidecard">
   ${avatar(g.img,g.name)}
   <div class="gbody">
     <div style="display:flex;justify-content:space-between;gap:8px;align-items:center">
       <div style="font-weight:700">${esc(g.name)}</div>
       <span class="pill green" style="font-size:10px">${originLabel[g.origin]}</span></div>
     ${r?`<div class="muted" style="font-size:11.5px;margin-top:2px">${IC.pin} ${r.pref}・${r.name}</div>`:''}
     <p class="muted" style="font-size:12.5px;margin:4px 0 6px">${esc(g.relation)}</p>
     <div class="glabelsm">できること</div>
     <div>${g.spec.map(s=>`<span class="tag">${s}</span>`).join('')}</div>
     <div class="glabelsm" style="margin-top:6px">話せる言語</div>
     ${langChips(g.langs)}
     ${g.lang_note?`<p class="langnote">${esc(g.lang_note)}</p>`:''}
     <button class="btn sm" data-act="apply" data-guide="${g.id}" style="margin-top:10px">メッセージで相談する <span class="demo">デモ</span></button>
   </div>
 </div>`;
}
/* ===== guide search ===== */
function openGuideSearch(){
 let list=S.guides.slice();
 if(searchRegion!=='all')list=list.filter(g=>g.region===searchRegion);
 if(searchLang!=='all')list=list.filter(g=>(g.langs||[]).some(l=>searchLang==='English'?/English|英語/.test(l):/日本語/.test(l)));
 const regOpts=[['all','すべての地域']].concat(S.regions.map(r=>[r.id,r.name]));
 const langOpts=[['all','言語すべて'],['日本語','日本語'],['English','English']];
 const html=`
  <button class="x" data-close>×</button>
  <div class="eyebrow" style="margin-top:6px">${IC.search} ガイドを探す</div>
  <h2 style="font-size:21px;margin-top:2px">地域とガイドを検索</h2>
  <p class="muted" style="font-size:12px;margin:6px 0 0">地域・言語でしぼり込み。対応言語やできることを見て、メッセージで「ガイドをお願いできるか」を相談できます。</p>
  <div class="glabelsm" style="margin-top:12px">地域</div>
  <div class="row">${regOpts.map(o=>`<button class="chip ${searchRegion===o[0]?'on':''}" data-gsregion="${o[0]}">${o[1]}</button>`).join('')}</div>
  <div class="glabelsm" style="margin-top:10px">言語</div>
  <div class="row">${langOpts.map(o=>`<button class="chip ${searchLang===o[0]?'on':''}" data-gslang="${o[0]}">${o[1]}</button>`).join('')}</div>
  <div style="margin:14px 0 0;font-size:12px;font-weight:700;color:var(--ink-soft)">${list.length}人のガイド</div>
  <div style="margin-top:8px">
    ${list.length?list.map(g=>guideCard(g,true)).join(''):'<p class="muted" style="text-align:center;padding:24px 0;font-size:13px">条件に合うガイドがいません。地域や言語を変えてみてください。</p>'}
  </div>
  <p class="muted" style="font-size:11px;margin-top:6px">※ 表示中のガイドはすべてデモ用のサンプルです。</p>
 `;
 openSheet(html);
}
function boardMini(b){
 return `<button class="card boardmini" data-board="${b.id}">
   ${b.img?`<img class="bminiimg" src="${b.img}" alt="" loading="lazy">`:`<span class="bminiimg ph">${IC.chat}</span>`}
   <span style="flex:1;min-width:0">
     <span class="pill ${b.type==='event'?'green':'new'}" style="font-size:10px">${b.type==='event'?'イベント':'ニュース'}</span>
     <span style="font-weight:700;font-size:13.5px;display:block;margin-top:3px">${esc(b.title)}</span>
     ${b.type==='event'?`<span class="muted" style="font-size:11.5px">${fdate(b.date)} ${b.time||''}</span>`:''}
   </span>
 </button>`;
}

/* ===== BOARD (回覧板) ===== */
let boardType='all', boardRegion='all';
function boardView(){
 let list=S.board.slice();
 if(boardType!=='all')list=list.filter(b=>b.type===boardType);
 if(boardRegion==='mine'){const c=certified().map(r=>r.id);list=list.filter(b=>c.includes(b.region));}
 else if(boardRegion!=='all')list=list.filter(b=>b.region===boardRegion);
 return `
 <div class="hd">${LOGOG}<div><h1>回覧板</h1><div class="sub">ふるさとのイベントとニュースが集まる場所</div></div></div>
 <div class="pad" style="margin-top:12px">
   <button class="btn block" data-act="postForm">${IC.plus} お知らせを掲載する <span class="demo">デモ投稿</span></button>
   <div class="row" style="margin-top:12px">
     ${[['all','すべて'],['event','イベント'],['news','ニュース']].map(t=>`<button class="chip ${boardType===t[0]?'on':''}" data-btype="${t[0]}">${t[1]}</button>`).join('')}
   </div>
   <div style="margin-top:8px">
     <select id="bregion">
       <option value="all" ${boardRegion==='all'?'selected':''}>すべての地域</option>
       <option value="mine" ${boardRegion==='mine'?'selected':''}>わたしのふるさと（認定済み ${certified().length}）</option>
       ${S.regions.map(r=>`<option value="${r.id}" ${boardRegion===r.id?'selected':''}>${r.pref}・${r.name}</option>`).join('')}
     </select>
   </div>
   <div style="margin-top:14px">
     ${list.length?list.map(boardCard).join(''):'<p class="muted" style="text-align:center;padding:30px 0">条件に合うお知らせはありません。</p>'}
   </div>
   <p class="muted" style="font-size:11px;margin-top:6px">※ デモ投稿はこのブラウザ内だけに保存され、公開はされません。実運用では自治体・ガイド・承認された発信者が掲載する想定です（審査・承認は未実装）。</p>
 </div>`;
}
function boardCard(b){
 const r=region(b.region);const sv=S.saved.includes(b.id);
 return `<div class="card" style="overflow:hidden;margin-bottom:12px">
   ${b.img?`<img class="bimg" src="${b.img}" alt="" loading="lazy">`:''}
   <div style="padding:13px">
   <div style="display:flex;justify-content:space-between;align-items:center;gap:8px">
     <span class="pill ${b.type==='event'?'green':'new'}" style="font-size:10px">${b.type==='event'?'イベント':'ニュース'}</span>
     <span class="muted" style="font-size:11px">${r?r.pref+'・'+r.name:''}${b.demo?' ・<span class="demo">投稿</span>':''}</span>
   </div>
   <div style="font-weight:700;margin-top:6px">${esc(b.title)}</div>
   ${b.type==='event'?`<div class="muted metaline">${IC.cal} ${fdate(b.date)} ${b.time||''}　${IC.pin} ${esc(b.place||'')}</div>`:''}
   ${b.type==='event'&&b.langs?`<div class="langline">${IC.globe}<span>実施言語</span>${langChips(b.langs)}</div>`:''}
   <p style="font-size:13px;margin:6px 0 0">${esc(b.body)}</p>
   ${b.people&&b.people.length?`<div class="attend">${b.people.map(p=>`<img src="${p}" alt="" loading="lazy">`).join('')}<span class="muted" style="font-size:11px;margin-left:6px">ほか 参加予定（デモ）</span></div>`:''}
   <div class="row" style="margin-top:10px;gap:8px">
     <button class="btn ghost sm" data-board="${b.id}">くわしく</button>
     <button class="btn ${sv?'gold':'ghost'} sm" data-save="${b.id}">${sv?IC.starF+' 保存済み':IC.star+' 保存する'}</button>
     ${b.type==='event'?`<button class="btn sm" data-join="${b.id}">${S.joined.includes(b.id)?IC.check+' 参加希望':'参加を希望する'} <span class="demo">デモ</span></button>`:''}
   </div>
   </div>
 </div>`;
}
function openBoard(id){
 const b=S.board.find(x=>x.id===id);if(!b)return;const r=region(b.region);const sv=S.saved.includes(b.id);
 openSheet(`<button class="x" data-close>×</button>
  ${b.img?`<div class="rhero" style="background-image:url('${b.img}')"></div>`:''}
  <div class="eyebrow" style="margin-top:10px">${b.type==='event'?'イベント':'ニュース'}${b.demo?' ・ デモ投稿':''}</div>
  <h2 style="font-size:21px;margin-top:2px">${esc(b.title)}</h2>
  <div class="muted" style="font-size:12.5px;margin-top:4px">${r?r.pref+'・'+r.name:''}${b.publisher?'　発信：'+esc(b.publisher):''}</div>
  ${b.type==='event'?`<div class="card" style="padding:12px;margin-top:12px;font-size:13px;line-height:1.9">
     <div class="metaline">${IC.cal} ${fdate(b.date)} ${b.time||''}</div>
     <div class="metaline">${IC.pin} ${esc(b.place||'')}</div>
     ${b.fee?`<div class="metaline">${IC.coin} ${esc(b.fee)}</div>`:''}
     <div class="metaline">${IC.pen} 申込：${esc(b.apply||'回覧板から参加希望（デモ）')}</div>
     ${b.langs?`<div class="langline" style="margin-top:4px">${IC.globe}<span>実施言語</span>${langChips(b.langs)}</div>`:''}</div>`:''}
  ${b.type==='event'?`<p class="langnote" style="margin-top:10px">日本語しか話せない方は翻訳機の使い方をその場でサポート。英語で話したい方は英語対応のメンバーと交流できます。</p>`:''}
  <p style="font-size:14px;margin-top:12px">${esc(b.body)}</p>
  ${b.people&&b.people.length?`<div class="attend" style="margin-top:12px">${b.people.map(p=>`<img src="${p}" alt="" loading="lazy">`).join('')}<span class="muted" style="font-size:11px;margin-left:6px">参加予定のメンバー（デモ）</span></div>`:''}
  <div class="row" style="margin-top:16px">
    <button class="btn ${sv?'gold':'ghost'}" data-save="${b.id}">${sv?IC.starF+' 保存済み':IC.star+' 保存する'}</button>
    ${b.type==='event'?`<button class="btn" data-join="${b.id}">${S.joined.includes(b.id)?IC.check+' 参加希望ずみ':'参加を希望する'} <span class="demo">デモ</span></button>`:''}
  </div>
  ${b.type==='event'?'<p class="muted" style="font-size:11px;margin-top:10px">参加希望はデモ操作です。実際の申込は行われません。</p>':''}`);
}
function postForm(){
 openSheet(`<button class="x" data-close>×</button>
  <h2 style="font-size:20px">お知らせを掲載する <span class="demo">デモ投稿</span></h2>
  <p class="muted" style="font-size:12px;margin-top:4px">この投稿はブラウザ内だけに保存されます（公開されません）。</p>
  <label class="f">種類</label>
  <div class="row" id="ptype">
    <button class="chip on" data-pt="event">イベント</button>
    <button class="chip" data-pt="news">ニュース</button>
  </div>
  <label class="f">地域</label>
  <select id="pregion">${S.regions.map(r=>`<option value="${r.id}">${r.pref}・${r.name}</option>`).join('')}</select>
  <label class="f">タイトル</label><input id="ptitle" maxlength="40" placeholder="例：秋の収穫さんぽ">
  <label class="f">本文</label><textarea id="pbody" rows="3" placeholder="内容を入力"></textarea>
  <div id="peventfields">
    <label class="f">開催日</label><input id="pdate" type="date" value="2026-10-17">
    <label class="f">時間・場所</label><input id="pplace" placeholder="例：10:00〜 公民館">
  </div>
  <div class="row" style="margin-top:16px">
    <button class="btn" data-act="preview">プレビュー</button>
    <button class="btn ghost" data-close>やめる</button>
  </div>
  <div id="pprev"></div>`);
 let pt='event';$('#sheet').dataset.pt='event';
 $('#ptype').addEventListener('click',e=>{const b=e.target.closest('[data-pt]');if(!b)return;
   pt=b.dataset.pt;$('#sheet').dataset.pt=pt;[...$('#ptype').children].forEach(c=>c.classList.toggle('on',c===b));
   $('#peventfields').classList.toggle('hidden',pt!=='event');});
}

/* ===== MESSAGES (LINE-style: list -> open chat) ===== */
function partyOf(t){ return t.peer || guide(t.guideId) || {name:'ガイド',img:'',origin:'resident',langs:[]}; }
function threadById(id){ return S.threads.find(x=>x.id===id); }
function pendingReqs(){ return (S.requests||[]).filter(x=>x.status!=='accepted'&&x.status!=='declined'); }
function msgView(){ return openThread?msgChat(openThread):msgList(); }
function msgList(){
 const reqs=pendingReqs();
 const reqSec=reqs.length?`
   <div class="reqhead">${IC.bell}<span>ガイド依頼（あなたへ）</span><span class="reqbadge">${reqs.length}</span></div>
   ${reqs.map(reqCard).join('')}
   <div class="mlabel">メッセージ</div>`:'';
 return `
 <div class="hd">${LOGOG}<div><h1>メッセージ</h1><div class="sub">${reqs.length?'ガイド依頼が届いています':'タップで会話を開きます（デモ・翻訳つき）'}</div></div></div>
 <div class="pad" style="margin-top:8px">
 ${reqSec}
 ${S.threads.length?`<div class="mlist">${S.threads.map(msgListRow).join('')}</div>`
   :`<div class="card" style="padding:24px;text-align:center;margin-top:8px">
     <p style="font-weight:700">まだやりとりはありません</p>
     <p class="muted" style="font-size:13px;margin:6px 0 12px">ホームの「ガイドを探す」から気になるガイドに「交流を申し込む」と、ここに会話が表示されます。</p>
     <button class="btn sm" data-act="findGuide">ガイドを探す</button></div>`}
   <p class="muted" style="font-size:11px;margin-top:10px">※ 送受信・翻訳・依頼はデモ表示です。実際の送信や外部サービス連携は行われません。</p>
 </div>`;
}
function reqCard(rq){
 const r=region(rq.region);
 return `<div class="card reqcard">
   <div class="reqtop">
     ${avatar(rq.img,rq.name,'sm')}
     <div style="flex:1;min-width:0">
       <div style="font-weight:700;font-size:14px">${esc(rq.name)} <span class="pill green" style="font-size:9px">${originLabel[rq.origin]||''}</span></div>
       <div class="muted" style="font-size:11px">${r?r.pref+'・'+r.name:''}のガイドを希望</div>
     </div>
   </div>
   ${langChips(rq.langs)}
   <p style="font-size:13px;margin:8px 0 0">${esc(rq.text)}</p>
   ${rq.en?`<button class="trbtn" data-tr="rqtr-${rq.id}">${IC.globe} 翻訳を表示</button>
     <div class="trtext" id="rqtr-${rq.id}"><span class="muted" style="font-size:11px;font-weight:700">English（自動翻訳）</span><br>${esc(rq.en)}</div>`:''}
   <div class="row" style="margin-top:10px;gap:8px">
     <button class="btn sm" data-reqok="${rq.id}">承認して会話を始める</button>
     <button class="btn ghost sm" data-reqng="${rq.id}" style="color:var(--shu);border-color:var(--shu)">お断り</button>
   </div>
 </div>`;
}
function msgListRow(t){
 const p=partyOf(t);const r=region(t.region);
 const last=t.msgs[t.msgs.length-1]||{};
 const prev=(last.who==='me'?'あなた: ':'')+ (last.text||'');
 return `<button class="mlistrow" data-openmsg="${t.id}">
   ${avatar(p.img,p.name,'sm')}
   <span class="mlistbody">
     <span class="mlisttop"><span class="mlistname">${esc(p.name)}</span>
       <span class="muted mlistloc">${r?r.pref+'・'+r.name:''}</span></span>
     <span class="muted mlistprev">${esc(prev)}</span>
   </span>
   <svg viewBox="0 0 24 24" class="i mlistchev"><path d="M9 6l6 6-6 6"/></svg>
 </button>`;
}
function msgChat(id){
 const t=threadById(id);if(!t)return msgList();
 const p=partyOf(t);const r=region(t.region);
 const enOk=(p.langs||[]).some(l=>/English|英語/.test(l));
 return `<div class="chatwrap">
 <div class="chathd">
   <button class="chatback" data-msgback aria-label="戻る"><svg viewBox="0 0 24 24" class="i"><path d="M15 6l-6 6 6 6"/></svg></button>
   ${avatar(p.img,p.name,'sm')}
   <div style="flex:1;min-width:0">
     <div style="font-weight:700;font-size:15px;line-height:1.2">${esc(p.name)}</div>
     <div class="muted" style="font-size:11px">${r?r.pref+'・'+r.name:''}${p.origin?'　'+(originLabel[p.origin]||''):''}</div>
   </div>
   <button class="chattr ${autoTr?'on':''}" data-autotr aria-label="メッセージをすべて翻訳">${IC.globe}<span>翻訳</span></button>
 </div>
 <div class="chatscroll" id="chatscroll">
   <div class="chatdaysep"><span>${autoTr?'翻訳表示中（デモ・自動翻訳）':'デモの会話'}</span></div>
   ${t.msgs.map((m,i)=>bubble(t.id,i,m,p)).join('')}
 </div>
 <div class="chatin">
   <input id="mi-${t.id}" placeholder="メッセージを入力（デモ）" autocomplete="off">
   <button class="chatsend" data-send="${t.id}" aria-label="送信"><svg viewBox="0 0 24 24" class="i"><path d="M4 10.5h9.5V6l6.5 6-6.5 6v-4.5H4z"/></svg></button>
 </div>
 </div>`;
}
function bubble(tid,i,m,g){
 const mine=m.who==='me';
 const trId=`tr-${tid}-${i}`;
 const av=(!mine&&g&&g.img)?`<img class="bubav" src="${g.img}" alt="" loading="lazy">`:'';
 const show=autoTr&&!!m.en;
 const tr=m.en?`<button class="trbtn" data-tr="${trId}">${IC.globe} ${show?'翻訳を隠す':'翻訳を表示'}</button>
     <div class="trtext ${show?'show':''}" id="${trId}"><span class="muted" style="font-size:11px;font-weight:700">English（自動翻訳）</span><br>${esc(m.en)}</div>`:'';
 return `<div class="mrow ${mine?'me':'them'}">
   ${av}
   <div class="bwrap">
     <div class="bubble ${mine?'bme':'bthem'}">${esc(m.text)}</div>
     ${tr}
   </div>
 </div>`;
}

/* ===== MY PAGE ===== */
function meAvatar(cls){
 const me=S.me||{};
 return me.img?`<img class="meav ${cls||''}" src="${me.img}" alt="プロフィール画像" loading="lazy"
   onerror="this.classList.add('hide');this.nextElementSibling&&(this.nextElementSibling.style.display='inline-flex')">
   <span class="meav ph ${cls||''}" style="display:none">${esc((me.name||'あ').slice(0,1))}</span>`
   :`<span class="meav ph ${cls||''}">${esc((me.name||'あ').slice(0,1))}</span>`;
}
function pgridCell(r){
 const cert=r.status==='certified';
 const bg=r.photo?`background-image:url('${r.photo}')`:'background:linear-gradient(135deg,var(--green),var(--green-tint))';
 return `<button class="pcell ${cert?'cert':'prog'}" data-region="${r.id}" style="${bg}">
   <span class="pcellbadge ${cert?'gold':'prog'}">${cert?IC.starF+' 認定済み':(r.stamps||0)+'/'+STAMP_MAX}</span>
   <span class="pcellname">${esc(r.name)}</span>
 </button>`;
}
function editProfile(){
 const me=S.me||{};
 openSheet(`<button class="x" data-close>×</button>
  <h2 style="font-size:20px">プロフィールを編集 <span class="demo">デモ</span></h2>
  <p class="muted" style="font-size:12px;margin-top:4px">この内容はこのブラウザ内だけに保存されます。</p>
  <div style="display:flex;justify-content:center;margin:14px 0 4px">${meAvatar('lg')}</div>
  <p class="muted" style="font-size:11px;text-align:center;margin:0 0 6px">プロフィール画像は public/people/me.png を差し替えると反映されます</p>
  <label class="f">表示名</label><input id="pfname" maxlength="20" value="${esc(me.name||'')}">
  <label class="f">ユーザー名（@）</label><input id="pfhandle" maxlength="20" value="${esc(me.handle||'')}">
  <label class="f">ひとこと（自己紹介）</label><textarea id="pfbio" rows="3" maxlength="120">${esc(me.bio||'')}</textarea>
  <div class="row" style="margin-top:16px">
    <button class="btn" data-act="saveProfile">保存する</button>
    <button class="btn ghost" data-close>やめる</button>
  </div>`);
}
function saveProfile(){
 const n=($('#pfname').value||'').trim();const h=($('#pfhandle').value||'').trim().replace(/^@/,'');
 const b=($('#pfbio').value||'').trim();
 S.me=S.me||{};S.me.name=n||'あなた';S.me.handle=h||'furusato_you';S.me.bio=b;
 save();closeSheet();render();toast('プロフィールを保存しました（デモ）');
}
function myView(){
 const cs=certified();const me=S.me||{};
 const grid=S.regions.filter(r=>r.status==='certified'||r.status==='learning');
 return `
 <div class="hd">${LOGOG}<div><h1>マイページ</h1><div class="sub">わたしのプロフィール</div></div></div>
 <div class="pad" style="margin-top:12px">

   <!-- ===== profile ===== -->
   <div class="card profcard">
     <div class="profcover"></div>
     <div class="profinner">
       <div class="profavwrap">${meAvatar('lg')}</div>
       <div class="profname">${esc(me.name||'あなた')}</div>
       <div class="profhandle">@${esc(me.handle||'furusato_you')}</div>
       ${me.bio?`<p class="profbio">${esc(me.bio)}</p>`:''}
       <div class="profstatbar">
         <button class="pstat" data-go="map"><b class="s-gold">${cs.length}</b><span>ふるさと</span></button>
         <button class="pstat" data-act="myThreads"><b>${S.threads.length}</b><span>交流</span></button>
         <button class="pstat" data-act="mySaved"><b>${S.saved.length}</b><span>保存</span></button>
       </div>
       <div class="profbtns">
         <button class="btn ghost sm block" data-act="editProfile">プロフィールを編集</button>
         <button class="btn sm block" data-act="findGuide">ふるさとを増やす</button>
       </div>
     </div>
   </div>

   <div class="proftabs"><span class="on">${IC.pin} わたしのふるさと</span></div>
   ${grid.length?`<div class="pgrid">${grid.map(pgridCell).join('')}</div>`
     :'<p class="muted" style="font-size:13px;text-align:center;padding:20px 0">まだふるさとがありません。マップから地域を知るところから始めましょう。</p>'}
   <div class="pglegend">
     <span><i class="lg-gold"></i>認定済みのふるさと</span>
     <span><i class="lg-prog"></i>進行中（交流・学習中）</span>
   </div>

   <h3 style="font-size:15px;margin:20px 0 8px">認定後の二つの過ごし方</h3>
   <div class="two">
     <div class="card" style="padding:13px">
       <div style="font-weight:700;display:flex;align-items:center;gap:6px">${IC.cup} ふるさととして楽しむ</div>
       <p class="muted" style="font-size:12px;margin:5px 0 0">会いたい人に会いに帰る。なじみの店に寄る。景色を眺めてのんびり。行事参加は任意です。</p>
     </div>
     <div class="card" style="padding:13px">
       <div style="font-weight:700;display:flex;align-items:center;gap:6px">${IC.leaf} ガイドとして案内する</div>
       <p class="muted" style="font-size:12px;margin:5px 0 0">希望する人が、さらに学び、先輩ガイドに同行・実習を重ね、次に来た人へその地域を案内・紹介します。</p>
     </div>
   </div>
   <p class="muted" style="font-size:11px;margin-top:8px">ふるさと認定と、ガイドとして案内できる状態は別に管理します。ガイドとして案内するのは希望する人だけです。</p>

   <h3 style="font-size:15px;margin:20px 0 8px">地域で始める・ガイドを育てる</h3>
   <div class="card" style="padding:14px">
     <p style="font-size:13px;margin:0">立ち上げ時は市町村と連携し、地元に詳しい人を講師に迎え、講座・まち歩き・案内実習で最初の“一期生”を育てます。
     一期生が利用者を迎え、希望者が次のガイドへ育つことで、少しずつ地域に広がります。</p>
     <p class="muted" style="font-size:12px;margin:8px 0 0">共通の講座教材・認定の確認項目・運営手順に、地域独自の内容を加えられる設計です。商店街、散歩道、家庭の味、公民館なども題材になります。</p>
     <p class="muted" style="font-size:11px;margin:8px 0 0">※ これは導入の構想です。実際の自治体との提携が成立しているわけではありません。認定はアプリ内の仕組みで、行政の公的資格ではありません。</p>
   </div>

   <div style="margin-top:22px;display:flex;gap:8px;flex-wrap:wrap">
     <button class="btn ghost sm" data-act="theme">配色を切替</button>
     <button class="btn ghost sm" data-act="reset" style="color:var(--shu);border-color:var(--shu)">デモを初期状態に戻す</button>
   </div>
   <p class="muted" style="font-size:11px;margin-top:14px">生成AIの使用について：文章の整理・推敲や試作品の作成に、ChatGPTとClaudeを使用しました。</p>
 </div>`;
}

/* ---------- sheet control ---------- */
function openSheet(html){$('#sheet').innerHTML='<div class="grab"></div>'+html;$('#sheetBg').classList.add('open');
 $('#sheet').scrollTop=0;requestAnimationFrame(()=>$('#sheet').classList.add('open'));}
function closeSheet(){$('#sheet').classList.remove('open');$('#sheetBg').classList.remove('open');}

/* ---------- actions ---------- */
function applyGuide(gid){
 const g=guide(gid);if(!g)return;
 const r=region(g.region);
 if(r.status==='new'){r.status='learning';r.reflection=r.reflection||{};}
 const tid='t-'+gid;
 if(!threadById(tid)){
   S.threads.unshift({id:tid,guideId:gid,region:g.region,msgs:[
     {who:'me',text:`${r.name}のガイドをお願いできますか？${g.spec[0]}に興味があります。`,
      en:`Could you be my guide in ${r.name}? I’m interested in ${g.spec[0]}.`},
     {who:'them',text:`ようこそ！ぜひ案内します。まず何が気になりますか？対応言語：${g.langs.join('・')}。翻訳機も使えます。`,
      en:`Welcome! I’d be glad to guide you. What are you most curious about? Languages: ${g.langs.join(', ')}. A translation device is fine too.`}
   ]});
 }
 save();closeSheet();toast('交流を申し込みました（デモ）。メッセージへ');openThread=tid;go('msg',true);
}
function acceptReq(id){
 const rq=(S.requests||[]).find(x=>x.id===id);if(!rq)return;
 rq.status='accepted';
 const tid='t-'+rq.id;
 if(!threadById(tid)){
   S.threads.unshift({id:tid,region:rq.region,peer:{name:rq.name,img:rq.img,origin:rq.origin,langs:rq.langs},
     msgs:[
       {who:'them',text:rq.text,en:rq.en},
       {who:'me',text:'ご依頼ありがとうございます。喜んで案内します。日程を決めましょう。',
        en:'Thank you for your request. I’d be happy to guide you. Let’s set a date.'}
     ]});
 }
 save();closeSheet();toast('依頼を承認しました。会話を始めます（デモ）');openThread=tid;go('msg',true);
}
function declineReq(id){
 const rq=(S.requests||[]).find(x=>x.id===id);if(!rq)return;
 rq.status='declined';save();render();toast('依頼をお断りしました（デモ）');
}
function certify(id){const r=region(id);r.status='certified';r.stamps=STAMP_MAX;save();closeSheet();
 setTimeout(()=>{go('map');toast(IC.starF+' スタンプ3つで“ふるさと認定”！地図の目印が金色になりました');},60);}
function stampGet(id){const r=region(id);if(!r)return;
 r.stamps=Math.min(STAMP_MAX,(r.stamps||0)+1);
 if(r.status==='new')r.status='learning';
 save();
 if(r.stamps>=STAMP_MAX){certify(id);return;}
 openRegion(id);toast(IC.starF+' ふるさとスタンプを1つ集めました（'+r.stamps+'/'+STAMP_MAX+'）');}

/* ---------- event delegation ---------- */
$('#app').addEventListener('click',e=>{
 const t=e.target;
 const tab=t.closest('[data-tab]'); if(tab){go(tab.dataset.tab);return;}
 const gto=t.closest('[data-go]'); if(gto){go(gto.dataset.go);return;}
 if(t.closest('[data-close]')){closeSheet();return;}
 if(t.id==='sheetBg'){closeSheet();return;}
 if(t.closest('[data-autotr]')){autoTr=!autoTr;render();toast(autoTr?'メッセージの自動翻訳をオンにしました（デモ）':'自動翻訳をオフにしました');return;}
 const trb=t.closest('[data-tr]'); if(trb){const el=document.getElementById(trb.dataset.tr);
   if(el){const on=el.classList.toggle('show');trb.innerHTML=IC.globe+' '+(on?'翻訳を隠す':'翻訳を表示');}return;}
 const act=t.closest('[data-act]');
 if(act){
   const a=act.dataset.act, rid=act.dataset.region;
   if(a==='findGuide'){openGuideSearch();return;}
   if(a==='boardRegion'){boardRegion=rid;boardType='all';closeSheet();go('board');return;}
   if(a==='apply'){applyGuide(act.dataset.guide);return;}
   if(a==='certify'){certify(rid);return;}
   if(a==='stampGet'){stampGet(rid);return;}
   if(a==='enjoy'){S.goalGuide[rid]=false;save();toast('「ふるさととして楽しむ」を選びました');closeSheet();return;}
   if(a==='aimGuide'){S.goalGuide[rid]=true;save();toast('「ガイドとして案内する」を選びました（希望制）');closeSheet();return;}
   if(a==='postForm'){postForm();return;}
   if(a==='preview'){doPreview();return;}
   if(a==='reset'){resetAll();return;}
   if(a==='theme'){toggleTheme();return;}
   if(a==='editProfile'){editProfile();return;}
   if(a==='saveProfile'){saveProfile();return;}
   if(a==='myThreads'){closeSheet();go('msg');return;}
   if(a==='mySaved'){closeSheet();boardRegion='all';boardType='all';go('board');toast('保存した回覧板は「保存する」を押した項目です（デモ）');return;}
   return;
 }
 const tog=t.closest('[data-toggle]');
 if(tog){const r=region(tog.dataset.region);r.reflection=r.reflection||{};r.reflection[tog.dataset.toggle]=!r.reflection[tog.dataset.toggle];save();openRegion(tog.dataset.region);return;}
 const rc=t.closest('[data-region]');
 if(rc && rc.dataset.region && !rc.dataset.act){openRegion(rc.dataset.region);return;}
 const bd=t.closest('[data-board]'); if(bd){openBoard(bd.dataset.board);return;}
 const sv=t.closest('[data-save]'); if(sv){const id=sv.dataset.save;const i=S.saved.indexOf(id);
   if(i<0){S.saved.push(id);toast('保存しました');}else{S.saved.splice(i,1);toast('保存を外しました');}save();
   if($('#sheet').classList.contains('open'))openBoard(id);else render();return;}
 const jn=t.closest('[data-join]'); if(jn){const id=jn.dataset.join;if(!S.joined.includes(id))S.joined.push(id);save();
   toast('参加を希望しました（デモ）');if($('#sheet').classList.contains('open'))openBoard(id);else render();return;}
 const btype=t.closest('[data-btype]'); if(btype){boardType=btype.dataset.btype;render();return;}
 const rok=t.closest('[data-reqok]'); if(rok){acceptReq(rok.dataset.reqok);return;}
 const rng=t.closest('[data-reqng]'); if(rng){declineReq(rng.dataset.reqng);return;}
 const gs=t.closest('[data-gsregion]'); if(gs){searchRegion=gs.dataset.gsregion;openGuideSearch();return;}
 const gl=t.closest('[data-gslang]'); if(gl){searchLang=gl.dataset.gslang;openGuideSearch();return;}
 const om=t.closest('[data-openmsg]'); if(om){openThread=om.dataset.openmsg;autoTr=false;render();return;}
 if(t.closest('[data-msgback]')){openThread=null;autoTr=false;render();return;}
 const send=t.closest('[data-send]'); if(send){sendMsg(send.dataset.send);return;}
});
function sendMsg(tid){
 const inp=$('#mi-'+tid);if(!inp)return;const v=(inp.value||'').trim();if(!v)return;
 const th=threadById(tid);if(!th)return;
 th.msgs.push({who:'me',text:v});
 th.msgs.push({who:'them',text:'（デモ返信）ありがとうございます！当日を楽しみにしています。',
   en:'(demo reply) Thank you! I’m looking forward to the day.'});
 save();render();}
$('#app').addEventListener('keydown',e=>{if(e.key==='Enter'){const inp=e.target.closest('input[id^="mi-"]');if(inp){e.preventDefault();sendMsg(inp.id.slice(3));}}});
$('#main').addEventListener('change',e=>{if(e.target.id==='bregion'){boardRegion=e.target.value;render();}});

/* preview + post inside sheet */
function doPreview(){
 const pt=$('#sheet').dataset.pt||'event';
 const title=($('#ptitle').value||'').trim();const body=($('#pbody').value||'').trim();
 const rid=$('#pregion').value;
 if(!title||!body){toast('タイトルと本文を入力してください');return;}
 const item={id:'u'+Date.now(),region:rid,type:pt,title,body,demo:true,publisher:'あなた（デモ投稿）'};
 if(pt==='event'){item.date=$('#pdate').value||'2026-10-17';item.time='';item.place=($('#pplace').value||'').trim();item.apply='回覧板から参加希望（デモ）';}
 $('#pprev').innerHTML=`<div style="margin-top:16px"><div class="eyebrow">プレビュー</div>${boardCard(item)}
   <button class="btn gold block" id="postBtn" style="margin-top:6px">この内容で回覧板に反映する</button></div>`;
 $('#postBtn').addEventListener('click',()=>{S.board.unshift(item);save();closeSheet();boardType='all';boardRegion='all';go('board');toast('回覧板に掲載しました（デモ・ブラウザ内保存）');});
}

/* theme toggle */
function toggleTheme(){const cur=document.documentElement.getAttribute('data-theme');
 const next=cur==='dark'?'light':cur==='light'?'dark':(matchMedia('(prefers-color-scheme: dark)').matches?'light':'dark');
 document.documentElement.setAttribute('data-theme',next);try{localStorage.setItem('fm-theme',next);}catch(e){}}
try{const th=localStorage.getItem('fm-theme');if(th)document.documentElement.setAttribute('data-theme',th);}catch(e){}

render();
