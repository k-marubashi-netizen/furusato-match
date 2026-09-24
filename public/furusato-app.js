/* ---------- brand logo (pin + house) ---------- */
const LOGO='<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C7.9 2 4.5 5.4 4.5 9.5c0 5.3 7.5 12 7.5 12s7.5-6.7 7.5-12C19.5 5.4 16.1 2 12 2zM12 6.2 8.4 9.1V13h7.2V9.1L12 6.2z" fill="#3f7d5f"/></svg>';

/* ---------- seed data ---------- */
function seed(){return{
 version:6,
 regions:[
  {id:'otari',name:'小谷村',pref:'長野県',x:196,y:150,status:'certified',
   blurb:'雪国の里山。田んぼの畦道と山の恵み、湯けむりの暮らし。',
   theme:['自然','暮らし','祭り'],
   reflection:{culture:true,life:true,manner:true,nature:true},
   experiences:['山口さんと畦道さんぽ','郷土料理づくりを教わった','雪囲いの意味を聞いた']},
  {id:'noto',name:'能登町',pref:'石川県',x:170,y:176,status:'learning',
   blurb:'海と発酵食の町。朝市の賑わいと、移住者が見つけた能登。',
   theme:['食','自然','暮らし'],
   reflection:{culture:true,life:true,manner:false,nature:false},
   experiences:['朝市を一緒に歩いた']},
  {id:'miyama',name:'南丹市美山町',pref:'京都府',x:150,y:206,status:'learning',
   blurb:'かやぶきの里。囲炉裏を囲む夜、暮らしと文化の語らい。',
   theme:['文化','暮らし','自然'],
   reflection:{culture:true,life:false,manner:true,nature:false},
   experiences:['囲炉裏で暮らしトーク']},
  {id:'yame',name:'八女市',pref:'福岡県',x:74,y:250,status:'new',
   blurb:'八女茶の里。茶畑と、近隣から通う学生ガイドの案内。',
   theme:['食','自然','文化'],reflection:{},experiences:[]},
  {id:'higashikawa',name:'東川町',pref:'北海道',x:236,y:64,status:'new',
   blurb:'大雪山の水と写真の町。移住者が語る北の暮らし。',
   theme:['自然','暮らし'],reflection:{},experiences:[]},
  {id:'shimanto',name:'四万十町',pref:'高知県',x:108,y:268,status:'new',
   blurb:'清流四万十。沈下橋と川の恵み、家庭の味。',
   theme:['自然','食'],reflection:{},experiences:[]}
 ],
 guides:[
  {id:'g1',region:'otari',name:'山口 誠',origin:'resident',langs:['日本語','翻訳アプリ可'],
   spec:['里山の歩き方','郷土料理','地域のマナー'],relation:'この谷で生まれ育って60年。'},
  {id:'g2',region:'noto',name:'田村 さやか',origin:'other',langs:['日本語','English'],
   spec:['朝市めぐり','発酵食','暮らし'],relation:'東京から移住して7年。よそ者だった私だから話せる能登。'},
  {id:'g3',region:'miyama',name:'小林 久子',origin:'resident',langs:['日本語'],
   spec:['囲炉裏の暮らし','季節の行事','家庭料理'],relation:'美山で三世代。おかえりと言える家です。'},
  {id:'g4',region:'miyama',name:'Marie（マリー）',origin:'overseas',langs:['Français','English','日本語'],
   spec:['文化の背景を通訳','写真さんぽ'],relation:'フランス出身。美山に暮らして4年、学んだ文化を母語でも伝えます。'},
  {id:'g5',region:'yame',name:'中村 陽介',origin:'other',langs:['日本語','English'],
   spec:['茶畑体験','商店街さんぽ'],relation:'近隣の大学に通いながら八女を学ぶ2年目。'}
 ],
 board:[
  {id:'b1',region:'otari',type:'event',title:'里山の畦道さんぽと保存食づくり',
   body:'田んぼの畦道を歩き、地域の方に雪国の暮らしと山の恵みを教わります。採れた食材で小さな保存食も。',
   date:'2026-10-03',time:'15:00〜17:00',place:'小谷村公民館 集合',apply:'回覧板から参加希望（デモ）',
   publisher:'小谷の地域メンバー',fee:'500円'},
  {id:'b2',region:'noto',type:'event',title:'朝市で朝ごはん。能登の食卓を知る',
   body:'地元の人と朝市を歩き、旬の魚や発酵食を選んで、一緒に小さな朝ごはんを囲みます。',
   date:'2026-10-04',time:'8:00〜10:00',place:'能登町 朝市周辺',apply:'回覧板から参加希望（デモ）',
   publisher:'能登の住民・飲食店メンバー',fee:'1,200円'},
  {id:'b3',region:'miyama',type:'event',title:'美山の夜、囲炉裏で暮らしトーク',
   body:'囲炉裏を囲み、季節の行事やご近所づきあい、暮らしの知恵を気軽に語り合います。',
   date:'2026-10-10',time:'18:00〜19:30',place:'美山町 地域交流館',apply:'回覧板から参加希望（デモ）',
   publisher:'美山の地域メンバー',fee:'無料'},
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
 saved:[],           // board ids
 joined:[],          // event ids (参加希望)
 threads:[],         // {guideId, region, msgs:[{who,text}]}
 goalGuide:{}        // regionId: true  (ガイドを目指す表明)
}}

/* ---------- state / storage ---------- */
const KEY='furusato-match-v6';
let S=load();
function load(){try{const r=localStorage.getItem(KEY);if(r){const o=JSON.parse(r);if(o&&o.version===6)return o;}}catch(e){}return seed();}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
function resetAll(){S=seed();save();render();toast('デモを初期状態に戻しました');go('home');}

/* ---------- helpers ---------- */
const $=s=>document.querySelector(s);
const region=id=>S.regions.find(r=>r.id===id);
const guidesOf=id=>S.guides.filter(g=>g.region===id);
const boardOf=id=>S.board.filter(b=>b.region===id);
const certified=()=>S.regions.filter(r=>r.status==='certified');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const WD=['日','月','火','水','木','金','土'];
function fdate(iso){if(!iso)return'';const d=new Date(iso+'T00:00:00');return `${d.getMonth()+1}月${d.getDate()}日(${WD[d.getDay()]})`;}
const originLabel={resident:'昔からの住民',other:'他地域から関わる人',overseas:'海外にルーツ'};
const statusMeta={certified:{t:'ふるさと認定済み',cls:'gold'},learning:{t:'交流・学習中',cls:'learn'},new:{t:'これから知る',cls:'new'}};
let toastT;
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('show'),1900);}

/* ---------- nav / routing ---------- */
let view='home';
const TABS=[
 {id:'home',label:'ホーム',ic:'M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10'},
 {id:'map',label:'マップ',ic:'M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14'},
 {id:'board',label:'回覧板',ic:'M4 5h16v14H4zM8 9h8M8 13h8M8 17h5'},
 {id:'msg',label:'メッセージ',ic:'M4 5h16v11H9l-4 4z'},
 {id:'my',label:'マイページ',ic:'M4 20a8 8 0 0116 0M12 11a4 4 0 100-8 4 4 0 000 8z'}
];
function nav(){$('#nav').innerHTML=TABS.map(t=>`<button data-tab="${t.id}" class="${t.id===view?'on':''}">
 <svg class="ic" viewBox="0 0 24 24"><path d="${t.ic}"/></svg>${t.label}</button>`).join('');}
function go(v){view=v;render();$('#main').scrollTop=0;}

/* ---------- render ---------- */
function render(){
 nav();
 const m=$('#main');
 m.innerHTML=({home:homeView,map:mapView,board:boardView,msg:msgView,my:myView}[view])();
}

/* ===== HOME ===== */
function homeView(){
 return `
 <div class="hero">
   <div style="display:flex;align-items:center;gap:8px">${LOGO}
     <div><div style="font-family:'Zen Maru Gothic';font-weight:700;font-size:15px">ふるさとマッチ</div>
     <div style="font-size:10.5px;color:#dff2e6">デモ試作品・ブラウザ内で動作します</div></div></div>
   <h1 style="margin-top:16px">誰もが、<br>ふるさとガイドになれる。</h1>
   <div class="lead">出会いから、ふるさとが増えていく。<br>住む場所も国籍も問いません。ガイドになるのは、希望する人だけ。</div>
   <div style="display:flex;gap:8px;margin-top:16px">
     <button class="btn gold sm" data-go="map">マップでふるさとを見る</button>
     <button class="btn ghost sm" data-act="findGuide" style="background:#ffffff22;color:#fff;border-color:#ffffff88">地域とガイドを探す</button>
   </div>
 </div>

 <div class="pad" style="margin-top:18px">
   <div class="card" style="padding:14px 15px">
     <div class="eyebrow">だれでも主役</div>
     <p style="margin:6px 0 0;font-size:13.5px">地域に住む人も、他地域に住む人も、海外から訪れた人も。立場を固定せず、
     どんな組み合わせでも交流できます。共通の“ふるさと”を通じて出会い、その土地のことを知り、親しみを深めます。</p>
   </div>
 </div>

 <div class="pad" style="margin-top:20px">
   <div class="eyebrow">つかいかた</div>
   <h2 class="sec-t">出会いから、ふるさとになるまで</h2>
   <div class="card" style="padding:6px 15px;margin-top:10px">
     ${[
       ['1','地域や人を見つける','地域・関心・対応言語から、地域とふるさとガイドを探します。'],
       ['2','マッチングして地域を知る','一緒にまちを歩き、名所だけでなくマナー・文化・暮らし・自然を知ります。'],
       ['3','体験を重ね、ふるさと認定','振り返りで理解を確かめ、地域ごとに“ふるさと認定”を受けられます。'],
       ['4','認定後の二つの楽しみ方','“ふるさととして楽しむ”か、希望すれば“ガイドを目指す”か。どちらも対等です。']
     ].map(s=>`<div class="step"><div class="n">${s[0]}</div><div><div style="font-weight:700">${s[1]}</div>
       <div class="muted" style="font-size:12.5px">${s[2]}</div></div></div>`).join('')}
   </div>
   <p class="muted" style="font-size:12px;margin-top:8px">※ ガイドになることは全員の目標ではありません。まずは“自分のふるさと”を増やすところから。</p>
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

/* ===== MAP ===== */
function mapView(){
 const pin=(r)=>{
   const c=r.status==='certified'?'var(--gold)':r.status==='learning'?'var(--shu)':'var(--surface)';
   const s=r.status==='certified'?'var(--gold-deep)':r.status==='learning'?'var(--shu)':'var(--ink-soft)';
   const dot=r.status==='certified'?'#7a5a12':'#fff';
   return `<g class="mk" data-region="${r.id}" transform="translate(${r.x},${r.y})" style="cursor:pointer">
     <path d="M0 0 C-7 -9 -11 -14 -11 -20 A11 11 0 1 1 11 -20 C11 -14 7 -9 0 0 Z"
       fill="${c}" stroke="${s}" stroke-width="2"/>
     <circle cx="0" cy="-20" r="4.4" fill="${r.status==='certified'?dot:s}"/>
     ${r.status==='certified'?'<circle cx="0" cy="-20" r="4.4" fill="none" stroke="#7a5a12" stroke-width="1"/>':''}
   </g>`;
 };
 return `
 <div class="hd">${LOGO}<div><h1>マップ</h1><div class="sub">認定した“ふるさと”が金色に増えていきます</div></div></div>
 <div class="pad" style="margin-top:12px">
   <div class="card" style="padding:12px 12px 8px;background:var(--sea)">
     <svg viewBox="0 0 300 320" style="width:100%;height:auto;display:block" role="img" aria-label="日本地図（簡略・デモ）">
       <!-- simplified archipelago backdrop -->
       <path d="M232 34 q28 6 26 34 q-4 20 -26 24 q-24 2 -30 -20 q-6 -30 30 -38 Z" fill="var(--green-tint)" stroke="var(--line)"/>
       <path d="M120 118 q40 -28 78 -8 q26 16 20 46 q-8 34 -46 60 q-40 26 -78 6 q-30 -18 -22 -58 q6 -34 48 -46 Z" fill="var(--green-tint)" stroke="var(--line)"/>
       <path d="M78 236 q22 -14 40 2 q14 14 2 34 q-16 22 -42 16 q-22 -6 -18 -30 q4 -18 18 -22 Z" fill="var(--green-tint)" stroke="var(--line)"/>
       <path d="M40 232 q18 -6 24 10 q4 16 -12 24 q-18 6 -26 -8 q-6 -18 14 -26 Z" fill="var(--green-tint)" stroke="var(--line)"/>
       ${S.regions.map(pin).join('')}
       ${S.regions.map(r=>`<text x="${r.x}" y="${r.y+14}" text-anchor="middle" font-size="9" font-weight="700"
         fill="var(--ink-soft)" font-family="Noto Sans JP">${r.name}</text>`).join('')}
     </svg>
     <div class="legend" style="justify-content:center;padding:6px 0 2px">
       <span><i style="background:var(--gold);border:1px solid var(--gold-deep)"></i>ふるさと認定済み</span>
       <span><i style="background:var(--shu)"></i>交流・学習中</span>
       <span><i style="background:var(--surface);border:1px solid var(--ink-soft)"></i>これから知る</span>
     </div>
   </div>
   <p class="muted" style="font-size:11px;margin-top:8px">地図はデモ用の簡略表示です。目印を押すと地域の詳細が開きます。認定は市町村など地域単位で扱います。</p>

   <div style="display:flex;align-items:baseline;gap:8px;margin:16px 4px 8px">
     <span class="gcount" style="font-size:26px">${certified().length}</span>
     <span style="font-weight:700">か所の“ふるさと”／全${S.regions.length}地域</span>
   </div>
   ${S.regions.map(r=>`<button class="card" data-region="${r.id}" style="display:flex;gap:10px;width:100%;text-align:left;
     align-items:center;padding:11px 13px;margin-bottom:8px;border:0">
     <span style="flex:0 0 auto;font-size:20px">${r.status==='certified'?'🟡':r.status==='learning'?'🟠':'⚪'}</span>
     <span style="flex:1;min-width:0">
       <span style="font-weight:700">${r.pref}・${r.name}</span>
       <span class="pill ${statusMeta[r.status].cls}" style="margin-left:6px">${statusMeta[r.status].t}</span>
       <span class="muted" style="display:block;font-size:12px;margin-top:2px">${esc(r.blurb)}</span>
     </span></button>`).join('')}
 </div>`;
}

/* ===== region detail sheet ===== */
function openRegion(id){
 const r=region(id);const gs=guidesOf(id);const bd=boardOf(id);
 const st=statusMeta[r.status];
 let cert='';
 if(r.status==='certified'){
   cert=`<div class="card" style="padding:14px;background:var(--gold-tint);border-color:var(--gold)">
     <div class="pill gold">★ ふるさと認定済み</div>
     <p style="font-size:13px;margin:8px 0 10px">この地域はあなたの“ふるさと”です。認定後の楽しみ方を選べます。</p>
     <div class="two">
       <button class="btn sm block" data-act="enjoy" data-region="${id}">ふるさととして楽しむ</button>
       <button class="btn ghost sm block" data-act="aimGuide" data-region="${id}">ガイドを目指す</button>
     </div>
     <p class="muted" style="font-size:11px;margin-top:8px">どちらも対等です。イベント参加は任意。ガイドは希望する人が進む道です。</p>
   </div>`;
 }else if(r.status==='learning'){
   const rf=r.reflection||{};const items=[['culture','文化'],['life','暮らし'],['manner','マナー'],['nature','自然']];
   const done=items.filter(i=>rf[i[0]]).length;
   cert=`<div class="card" style="padding:14px;background:var(--shu-tint);border-color:transparent">
     <div class="pill learn">交流・学習中</div>
     <p style="font-size:13px;margin:8px 0 8px">ガイドとの振り返りで、4つの理解を確かめます（${done}/4）。</p>
     <div class="row" style="gap:6px">${items.map(i=>`<span class="chip ${rf[i[0]]?'on':''}" data-toggle="${i[0]}" data-region="${id}" style="pointer-events:auto">${rf[i[0]]?'✓ ':''}${i[1]}</span>`).join('')}</div>
     <p class="muted" style="font-size:11px;margin:8px 0 10px">※ 認定基準はデモ上の仮設定です。実運用では地域と調整します。訪問回数やお気に入りだけでは認定しません。</p>
     <button class="btn gold block ${done<4?'':''}" data-act="certify" data-region="${id}" ${done<4?'disabled style="opacity:.5"':''}>
       ${done<4?'4つの振り返りで認定できます':'ふるさと認定を受ける'}</button>
   </div>`;
 }else{
   cert=`<div class="card" style="padding:14px">
     <div class="pill new">これから知る地域</div>
     <p style="font-size:13px;margin:8px 0 10px">まずはガイドと出会って、地域を知るところから。交流を申し込むと“学習中”になります。</p>
   </div>`;
 }
 const html=`
  <button class="x" data-close>×</button>
  <div style="margin-top:-6px">
    <div class="eyebrow">${r.pref}</div>
    <h2 style="font-size:22px">${r.name}
      <span class="pill ${st.cls}" style="font-size:11px;vertical-align:middle">${st.t}</span></h2>
    <p class="muted" style="font-size:13px;margin:6px 0 0">${esc(r.blurb)}</p>
    <div style="margin-top:6px">${r.theme.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
  </div>
  <div style="margin-top:14px">${cert}</div>

  <h3 style="font-size:15px;margin:18px 0 8px">この地域のふるさとガイド</h3>
  ${gs.length?gs.map(g=>guideCard(g)).join(''):'<p class="muted" style="font-size:13px">ガイドは準備中です。</p>'}

  <h3 style="font-size:15px;margin:18px 0 8px">回覧板（この地域）</h3>
  ${bd.length?bd.slice(0,3).map(b=>boardMini(b)).join(''):'<p class="muted" style="font-size:13px">お知らせはまだありません。</p>'}
  <button class="btn ghost sm" data-act="boardRegion" data-region="${id}" style="margin-top:6px">回覧板でこの地域を見る</button>

  <h3 style="font-size:15px;margin:18px 0 8px">体験記録</h3>
  ${(r.experiences&&r.experiences.length)?('<ul style="margin:0;padding-left:18px;font-size:13px">'+r.experiences.map(e=>`<li>${esc(e)}</li>`).join('')+'</ul>'):'<p class="muted" style="font-size:13px">まだ記録がありません。ガイドと交流すると増えていきます。</p>'}
 `;
 openSheet(html);
}
function guideCard(g){
 return `<div class="card" style="padding:12px;margin-bottom:8px">
   <div style="display:flex;justify-content:space-between;gap:8px">
     <div style="font-weight:700">${esc(g.name)}</div>
     <span class="pill green" style="font-size:10px">${originLabel[g.origin]}</span></div>
   <p class="muted" style="font-size:12.5px;margin:4px 0 6px">${esc(g.relation)}</p>
   <div>${g.spec.map(s=>`<span class="tag">${s}</span>`).join('')}</div>
   <div class="muted" style="font-size:11.5px;margin-top:6px">対応言語：${g.langs.join('・')}</div>
   <button class="btn sm" data-act="apply" data-guide="${g.id}" style="margin-top:9px">交流を申し込む <span class="demo">デモ</span></button>
 </div>`;
}
function boardMini(b){
 return `<button class="card" data-board="${b.id}" style="display:block;width:100%;text-align:left;padding:10px 12px;margin-bottom:6px;border:0">
   <span class="pill ${b.type==='event'?'green':'new'}" style="font-size:10px">${b.type==='event'?'イベント':'ニュース'}</span>
   <span style="font-weight:700;font-size:13.5px;display:block;margin-top:3px">${esc(b.title)}</span>
   ${b.type==='event'?`<span class="muted" style="font-size:11.5px">${fdate(b.date)} ${b.time||''}</span>`:''}
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
 <div class="hd">${LOGO}<div><h1>回覧板</h1><div class="sub">ふるさとのイベントとニュースが集まる場所</div></div></div>
 <div class="pad" style="margin-top:12px">
   <button class="btn block" data-act="postForm">＋ お知らせを掲載する <span class="demo">デモ投稿</span></button>
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
 return `<div class="card" style="padding:13px;margin-bottom:10px">
   <div style="display:flex;justify-content:space-between;align-items:center;gap:8px">
     <span class="pill ${b.type==='event'?'green':'new'}" style="font-size:10px">${b.type==='event'?'イベント':'ニュース'}</span>
     <span class="muted" style="font-size:11px">${r?r.pref+'・'+r.name:''}${b.demo?' ・<span class="demo">投稿</span>':''}</span>
   </div>
   <div style="font-weight:700;margin-top:6px">${esc(b.title)}</div>
   ${b.type==='event'?`<div class="muted" style="font-size:12px;margin-top:3px">🗓 ${fdate(b.date)} ${b.time||''}　📍${esc(b.place||'')}</div>`:''}
   <p style="font-size:13px;margin:6px 0 0">${esc(b.body)}</p>
   <div class="row" style="margin-top:10px;gap:8px">
     <button class="btn ghost sm" data-board="${b.id}">くわしく</button>
     <button class="btn ${sv?'gold':'ghost'} sm" data-save="${b.id}">${sv?'★ 保存済み':'☆ 保存する'}</button>
     ${b.type==='event'?`<button class="btn sm" data-join="${b.id}">${S.joined.includes(b.id)?'✓ 参加希望':'参加を希望する'} <span class="demo">デモ</span></button>`:''}
   </div>
 </div>`;
}
function openBoard(id){
 const b=S.board.find(x=>x.id===id);if(!b)return;const r=region(b.region);const sv=S.saved.includes(b.id);
 openSheet(`<button class="x" data-close>×</button>
  <div class="eyebrow">${b.type==='event'?'イベント':'ニュース'}${b.demo?' ・ デモ投稿':''}</div>
  <h2 style="font-size:21px;margin-top:2px">${esc(b.title)}</h2>
  <div class="muted" style="font-size:12.5px;margin-top:4px">${r?r.pref+'・'+r.name:''}${b.publisher?'　発信：'+esc(b.publisher):''}</div>
  ${b.type==='event'?`<div class="card" style="padding:12px;margin-top:12px;font-size:13px">
     🗓 ${fdate(b.date)} ${b.time||''}<br>📍 ${esc(b.place||'')}<br>${b.fee?'💴 '+esc(b.fee)+'<br>':''}✍ 申込：${esc(b.apply||'回覧板から参加希望（デモ）')}</div>`:''}
  <p style="font-size:14px;margin-top:12px">${esc(b.body)}</p>
  <div class="row" style="margin-top:16px">
    <button class="btn ${sv?'gold':'ghost'}" data-save="${b.id}">${sv?'★ 保存済み':'☆ 保存する'}</button>
    ${b.type==='event'?`<button class="btn" data-join="${b.id}">${S.joined.includes(b.id)?'✓ 参加希望ずみ':'参加を希望する'} <span class="demo">デモ</span></button>`:''}
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
 // wire type toggle inside sheet
 let pt='event';
 $('#ptype').addEventListener('click',e=>{const b=e.target.closest('[data-pt]');if(!b)return;
   pt=b.dataset.pt;[...$('#ptype').children].forEach(c=>c.classList.toggle('on',c===b));
   $('#peventfields').classList.toggle('hidden',pt!=='event');});
 $('#sheet').dataset.pt='event';
 $('#ptype').addEventListener('click',()=>{$('#sheet').dataset.pt=pt;});
}

/* ===== MESSAGES ===== */
function msgView(){
 return `
 <div class="hd">${LOGO}<div><h1>メッセージ</h1><div class="sub">申し込んだガイドとのやりとり（デモ）</div></div></div>
 <div class="pad" style="margin-top:12px">
 ${S.threads.length?S.threads.map(t=>{const g=S.guides.find(x=>x.id===t.guideId);const r=region(t.region);
   return `<div class="card" style="padding:13px;margin-bottom:10px">
     <div style="display:flex;justify-content:space-between"><div style="font-weight:700">${esc(g?g.name:'ガイド')}</div>
     <span class="muted" style="font-size:11px">${r?r.pref+'・'+r.name:''}</span></div>
     ${t.msgs.map(msg=>`<div style="margin-top:8px;display:flex;${msg.who==='me'?'justify-content:flex-end':''}">
       <div style="max-width:80%;padding:8px 11px;border-radius:14px;font-size:13px;
         background:${msg.who==='me'?'var(--green)':'var(--surface-2)'};color:${msg.who==='me'?'#fff':'var(--ink)'}">${esc(msg.text)}</div></div>`).join('')}
     <div class="row" style="margin-top:10px">
       <input id="mi-${t.guideId}" placeholder="メッセージを入力（デモ）">
       <button class="btn sm" data-send="${t.guideId}">送信 <span class="demo">デモ</span></button>
     </div></div>`;}).join('')
   :`<div class="card" style="padding:24px;text-align:center">
     <p style="font-weight:700">まだやりとりはありません</p>
     <p class="muted" style="font-size:13px;margin:6px 0 12px">マップやホームからガイドに「交流を申し込む」と、ここにデモのやりとりが表示されます。</p>
     <button class="btn sm" data-go="map">地域とガイドを探す</button></div>`}
   <p class="muted" style="font-size:11px;margin-top:6px">※ 送受信・翻訳はデモ表示です。実際の送信や外部サービス連携は行われません。</p>
 </div>`;
}

/* ===== MY PAGE ===== */
function myView(){
 const cs=certified();
 return `
 <div class="hd">${LOGO}<div><h1>マイページ</h1><div class="sub">わたしのふるさと</div></div></div>
 <div class="pad" style="margin-top:12px">
   <div class="card" style="padding:16px;background:var(--gold-tint);border-color:var(--gold)">
     <div style="display:flex;align-items:baseline;gap:8px">
       <span class="gcount">${cs.length}</span><span style="font-weight:700">か所の“ふるさと”</span></div>
     <p class="muted" style="font-size:12.5px;margin:6px 0 0">こんなふるさとは、何個あってもいい。</p>
   </div>

   <h3 style="font-size:15px;margin:18px 0 8px">認定済みのふるさと</h3>
   ${cs.length?cs.map(r=>`<button class="card" data-region="${r.id}" style="display:flex;width:100%;text-align:left;gap:10px;align-items:center;padding:11px 13px;margin-bottom:8px;border:0">
     <span style="font-size:18px">🟡</span>
     <span style="flex:1"><span style="font-weight:700">${r.pref}・${r.name}</span>
     <span class="muted" style="display:block;font-size:12px">${S.goalGuide[r.id]?'ガイドを目指し中':'ふるさととして楽しみ中'}</span></span>
     <span class="pill gold" style="font-size:10px">認定済み</span></button>`).join('')
   :'<p class="muted" style="font-size:13px">まだありません。学習中の地域で振り返りを終えると認定できます。</p>'}

   <h3 style="font-size:15px;margin:20px 0 8px">認定後の二つの楽しみ方</h3>
   <div class="two">
     <div class="card" style="padding:13px">
       <div style="font-weight:700">🍵 ふるさととして楽しむ</div>
       <p class="muted" style="font-size:12px;margin:5px 0 0">会いたい人に会いに帰る。なじみの店に寄る。景色を眺めてのんびり。行事参加は任意です。</p>
     </div>
     <div class="card" style="padding:13px">
       <div style="font-weight:700">🌱 ふるさとガイドを目指す</div>
       <p class="muted" style="font-size:12px;margin:5px 0 0">希望する人が、さらに学び、先輩ガイドに同行・実習を重ね、次の人へ伝える側へ進みます。</p>
     </div>
   </div>
   <p class="muted" style="font-size:11px;margin-top:8px">ふるさと認定と、ガイドとして活動できる状態は別に管理します。ガイドは全員の目標ではありません。</p>

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
 requestAnimationFrame(()=>$('#sheet').classList.add('open'));}
function closeSheet(){$('#sheet').classList.remove('open');$('#sheetBg').classList.remove('open');}

/* ---------- actions ---------- */
function applyGuide(gid){
 const g=S.guides.find(x=>x.id===gid);if(!g)return;
 const r=region(g.region);
 if(r.status==='new'){r.status='learning';r.reflection=r.reflection||{};}
 if(!S.threads.find(t=>t.guideId===gid)){
   S.threads.push({guideId:gid,region:g.region,msgs:[
     {who:'me',text:`${r.name}のこと、ぜひ教えてください。`},
     {who:'them',text:`ようこそ！${r.name}へ。一緒にまちを歩きましょう。まず何が気になりますか？`}
   ]});
 }
 save();closeSheet();toast('交流を申し込みました（デモ）。メッセージへ');go('msg');
}
function certify(id){const r=region(id);r.status='certified';save();closeSheet();render();
 setTimeout(()=>{go('map');toast('🎉 ふるさと認定！地図の目印が金色になりました');},60);}

/* ---------- event delegation ---------- */
$('#app').addEventListener('click',e=>{
 const t=e.target;
 const tab=t.closest('[data-tab]'); if(tab){go(tab.dataset.tab);return;}
 const gto=t.closest('[data-go]'); if(gto){go(gto.dataset.go);return;}
 if(t.closest('[data-close]')){closeSheet();return;}
 if(t.id==='sheetBg'){closeSheet();return;}
 const reg=t.closest('[data-region][data-act]'); // handled below by act
 const rc=t.closest('[data-region]');
 const act=t.closest('[data-act]');
 if(act){
   const a=act.dataset.act, rid=act.dataset.region;
   if(a==='findGuide'){go('map');return;}
   if(a==='boardRegion'){boardRegion=rid;boardType='all';closeSheet();go('board');return;}
   if(a==='apply'){applyGuide(act.dataset.guide);return;}
   if(a==='certify'){certify(rid);return;}
   if(a==='enjoy'){S.goalGuide[rid]=false;save();toast('「ふるさととして楽しむ」を選びました');closeSheet();return;}
   if(a==='aimGuide'){S.goalGuide[rid]=true;save();toast('「ガイドを目指す」を選びました（希望制）');closeSheet();return;}
   if(a==='postForm'){postForm();return;}
   if(a==='preview'){doPreview();return;}
   if(a==='reset'){resetAll();return;}
   if(a==='theme'){toggleTheme();return;}
   return;
 }
 const tog=t.closest('[data-toggle]');
 if(tog){const r=region(tog.dataset.region);r.reflection=r.reflection||{};r.reflection[tog.dataset.toggle]=!r.reflection[tog.dataset.toggle];save();openRegion(tog.dataset.region);return;}
 if(rc && rc.dataset.region && !rc.dataset.act){openRegion(rc.dataset.region);return;}
 const bd=t.closest('[data-board]'); if(bd){openBoard(bd.dataset.board);return;}
 const sv=t.closest('[data-save]'); if(sv){const id=sv.dataset.save;const i=S.saved.indexOf(id);
   if(i<0){S.saved.push(id);toast('保存しました');}else{S.saved.splice(i,1);toast('保存を外しました');}save();
   // re-render current context
   if($('#sheet').classList.contains('open')){const open=$('#sheet').querySelector('[data-save]');openBoard(id);}else render();return;}
 const jn=t.closest('[data-join]'); if(jn){const id=jn.dataset.join;if(!S.joined.includes(id))S.joined.push(id);save();
   toast('参加を希望しました（デモ）');if($('#sheet').classList.contains('open'))openBoard(id);else render();return;}
 const btype=t.closest('[data-btype]'); if(btype){boardType=btype.dataset.btype;render();return;}
 const send=t.closest('[data-send]'); if(send){const gid=send.dataset.send;const inp=$('#mi-'+gid);const v=(inp.value||'').trim();
   if(!v)return;const th=S.threads.find(x=>x.guideId===gid);th.msgs.push({who:'me',text:v});
   th.msgs.push({who:'them',text:'（デモ返信）ありがとうございます！当日を楽しみにしています。'});save();render();return;}
});
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
