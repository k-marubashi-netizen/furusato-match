import type { LocalizedText } from './locale-utils'

export const guideDetailCopy: Record<string, {
  offers: LocalizedText[]
  reviews: { name: string; country: LocalizedText; comment: LocalizedText }[]
}> = {
  g1: {
    offers: [
      { ja: '里山の歩き方', en: 'Walking the satoyama', zh: '里山散步', es: 'Caminar por el satoyama', de: 'Im Satoyama wandern', fr: 'Marcher dans le satoyama', it: 'Camminare nel satoyama' },
      { ja: '郷土料理づくり', en: 'Cooking local dishes', zh: '制作乡土料理', es: 'Cocinar platos locales', de: 'Lokale Gerichte kochen', fr: 'Cuisiner des plats locaux', it: 'Cucinare piatti locali' },
      { ja: '雪国の暮らし', en: 'Life in snow country', zh: '雪国生活', es: 'Vida en la región de nieve', de: 'Leben im Schneeland', fr: 'Vie dans le pays de neige', it: 'Vita nel paese della neve' },
      { ja: '地域のマナー', en: 'Local manners', zh: '当地礼仪', es: 'Costumbres locales', de: 'Lokale Umgangsformen', fr: 'Usages locaux', it: 'Usanze locali' },
    ],
    reviews: [
      { name: 'Emma', country: { ja: 'イギリス', en: 'United Kingdom', zh: '英国', es: 'Reino Unido', de: 'Vereinigtes Königreich', fr: 'Royaume-Uni', it: 'Regno Unito' }, comment: { ja: '家族みたいに迎えてくれて、本当に「ただいま」と言えました。', en: 'Makoto-san felt like family. I really said “tadaima” here.', zh: '诚先生像家人一样欢迎我，我真的在这里说出了“我回来了”。', es: 'Makoto me hizo sentir como en familia. De verdad sentí que podía decir «he vuelto».', de: 'Makoto fühlte sich wie Familie an. Hier konnte ich wirklich sagen: „Ich bin wieder da.“', fr: 'Makoto m’a accueilli comme un membre de la famille. J’ai vraiment pu dire « je suis de retour ».', it: 'Makoto mi ha fatto sentire in famiglia. Qui ho davvero potuto dire “sono tornato”.' } },
      { name: 'Lucas', country: { ja: 'フランス', en: 'France', zh: '法国', es: 'Francia', de: 'Frankreich', fr: 'France', it: 'Francia' }, comment: { ja: '山の知識が本当にすごい。歩くたびに新しいことを教わりました。', en: 'His knowledge of the mountains is incredible. I learned something at every step.', zh: '他对山里的知识太丰富了，每走一步都能学到新东西。', es: 'Su conocimiento de las montañas es increíble. Aprendí algo a cada paso.', de: 'Sein Wissen über die Berge ist unglaublich. Bei jedem Schritt habe ich etwas gelernt.', fr: 'Sa connaissance de la montagne est incroyable. J’ai appris quelque chose à chaque étape.', it: 'La sua conoscenza della montagna è incredibile. Ho imparato qualcosa a ogni passo.' } },
      { name: 'Mei', country: { ja: '台湾', en: 'Taiwan', zh: '台湾', es: 'Taiwán', de: 'Taiwan', fr: 'Taïwan', it: 'Taiwan' }, comment: { ja: 'とても温かい方。また小谷村に帰りたいです。', en: 'He was so welcoming. I already want to come back to Otari.', zh: '他非常温暖，我已经想再回小谷村了。', es: 'Fue muy acogedor. Ya quiero volver a Otari.', de: 'Er war so herzlich. Ich möchte schon wieder nach Otari zurück.', fr: 'Il était très chaleureux. J’ai déjà envie de revenir à Otari.', it: 'È stato davvero accogliente. Voglio già tornare a Otari.' } },
    ],
  },
  g2: {
    offers: [
      { ja: '朝市めぐり', en: 'Morning market walk', zh: '逛早市', es: 'Paseo por el mercado matinal', de: 'Morgenmarkt-Rundgang', fr: 'Balade au marché du matin', it: 'Passeggiata al mercato mattutino' },
      { ja: '海辺の暮らし', en: 'Life by the sea', zh: '海边生活', es: 'Vida junto al mar', de: 'Leben am Meer', fr: 'Vie au bord de la mer', it: 'Vita sul mare' },
      { ja: '発酵食づくり', en: 'Fermented food', zh: '发酵食品', es: 'Alimentos fermentados', de: 'Fermentierte Küche', fr: 'Cuisine fermentée', it: 'Cibi fermentati' },
      { ja: '文化のはなし', en: 'Local culture', zh: '当地文化', es: 'Cultura local', de: 'Lokale Kultur', fr: 'Culture locale', it: 'Cultura locale' },
    ],
    reviews: [
      { name: 'Sofia', country: { ja: 'スペイン', en: 'Spain', zh: '西班牙', es: 'España', de: 'Spanien', fr: 'Espagne', it: 'Spagna' }, comment: { ja: 'さやかさんは両方の視点を分かっていて、初めての私にぴったりでした。', en: 'Sayaka understands both sides. Perfect guide for first-timers.', zh: '早香能理解双方的视角，非常适合第一次来的人。', es: 'Sayaka entiende ambos puntos de vista. Perfecta para quien viene por primera vez.', de: 'Sayaka versteht beide Perspektiven. Perfekt für den ersten Besuch.', fr: 'Sayaka comprend les deux points de vue. Parfaite pour une première visite.', it: 'Sayaka capisce entrambi i punti di vista. Perfetta per chi viene per la prima volta.' } },
      { name: 'Daniel', country: { ja: 'ドイツ', en: 'Germany', zh: '德国', es: 'Alemania', de: 'Deutschland', fr: 'Allemagne', it: 'Germania' }, comment: { ja: '発酵食のお話が忘れられません。', en: 'I will never forget what I learned about local fermented food.', zh: '我不会忘记关于当地发酵食品学到的东西。', es: 'Nunca olvidaré lo que aprendí sobre los alimentos fermentados locales.', de: 'Was ich über lokale fermentierte Lebensmittel gelernt habe, werde ich nie vergessen.', fr: 'Je n’oublierai jamais ce que j’ai appris sur les aliments fermentés locaux.', it: 'Non dimenticherò mai ciò che ho imparato sui cibi fermentati locali.' } },
    ],
  },
  g3: {
    offers: [
      { ja: 'お茶畑の見学', en: 'Tea-field visit', zh: '参观茶园', es: 'Visita a los campos de té', de: 'Besuch der Teefelder', fr: 'Visite des champs de thé', it: 'Visita ai campi di tè' },
      { ja: '市場のあるき方', en: 'How to enjoy the market', zh: '逛市场的方法', es: 'Cómo disfrutar del mercado', de: 'Den Markt entdecken', fr: 'Découvrir le marché', it: 'Come vivere il mercato' },
      { ja: '学生目線の八女案内', en: 'Yame through a student perspective', zh: '学生视角看八女', es: 'Yame desde la mirada de un estudiante', de: 'Yame aus studentischer Sicht', fr: 'Yame vu par un étudiant', it: 'Yame dal punto di vista di uno studente' },
    ],
    reviews: [
      { name: 'Olivia', country: { ja: 'アメリカ', en: 'United States', zh: '美国', es: 'Estados Unidos', de: 'USA', fr: 'États-Unis', it: 'Stati Uniti' }, comment: { ja: 'お茶の体験が忘れられません。陽介さんはとても温かいです。', en: 'The tea tasting was unforgettable. Yosuke is so warm!', zh: '品茶体验让人难忘，阳介非常亲切。', es: 'La degustación de té fue inolvidable. ¡Yosuke es muy cercano!', de: 'Die Teeverkostung war unvergesslich. Yosuke ist unglaublich herzlich!', fr: 'La dégustation de thé était inoubliable. Yosuke est très chaleureux !', it: 'La degustazione del tè è stata indimenticabile. Yosuke è davvero accogliente!' } },
      { name: 'Chen', country: { ja: '中国', en: 'China', zh: '中国', es: 'China', de: 'China', fr: 'Chine', it: 'Cina' }, comment: { ja: '八女茶が大好きになりました。', en: 'I fell in love with Yame tea.', zh: '我爱上了八女茶。', es: 'Me enamoré del té de Yame.', de: 'Ich habe mich in Yame-Tee verliebt.', fr: 'Je suis tombé amoureux du thé de Yame.', it: 'Mi sono innamorato del tè di Yame.' } },
    ],
  },
  g4: {
    offers: [
      { ja: 'かやぶき集落めぐり', en: 'Thatched village walk', zh: '茅草屋村落散步', es: 'Paseo por el pueblo de tejados de paja', de: 'Spaziergang durchs Reetdachdorf', fr: 'Balade dans le village aux toits de chaume', it: 'Passeggiata nel villaggio dai tetti di paglia' },
      { ja: '季節の行事', en: 'Seasonal traditions', zh: '季节活动', es: 'Tradiciones estacionales', de: 'Saisonale Bräuche', fr: 'Traditions saisonnières', it: 'Tradizioni stagionali' },
      { ja: '和のマナー', en: 'Japanese manners', zh: '日本礼仪', es: 'Modales japoneses', de: 'Japanische Umgangsformen', fr: 'Usages japonais', it: 'Buone maniere giapponesi' },
      { ja: '暮らしの知恵', en: 'Everyday wisdom', zh: '生活智慧', es: 'Sabiduría cotidiana', de: 'Alltagswissen', fr: 'Savoirs du quotidien', it: 'Saggezza quotidiana' },
    ],
    reviews: [
      { name: 'James', country: { ja: 'カナダ', en: 'Canada', zh: '加拿大', es: 'Canadá', de: 'Kanada', fr: 'Canada', it: 'Canada' }, comment: { ja: '久子さんが「ふるさと」の意味を教えてくれました。本当に特別な時間でした。', en: 'Hisako-san taught me the meaning of “furusato”. Truly special.', zh: '久子女士让我理解了“故乡”的意义，真的很特别。', es: 'Hisako me enseñó el significado de «furusato». Fue algo realmente especial.', de: 'Hisako hat mir die Bedeutung von „Furusato“ gezeigt. Wirklich etwas Besonderes.', fr: 'Hisako m’a appris le sens de « furusato ». Un moment vraiment spécial.', it: 'Hisako mi ha insegnato il significato di “furusato”. Davvero speciale.' } },
      { name: 'Anna', country: { ja: 'イタリア', en: 'Italy', zh: '意大利', es: 'Italia', de: 'Italien', fr: 'Italie', it: 'Italia' }, comment: { ja: '美山での時間は一生の宝物です。ここなら「帰ってきた」と言える気がしました。', en: 'My time in Miyama became a lifelong memory. I really felt I could say “I’m home”.', zh: '在美山的时光会成为一生的回忆，我真的觉得这里可以说“我回来了”。', es: 'Mi tiempo en Miyama será un recuerdo para toda la vida. Sentí de verdad que podía decir «he vuelto a casa».', de: 'Meine Zeit in Miyama bleibt mir fürs Leben. Ich hatte wirklich das Gefühl sagen zu können: „Ich bin zu Hause.“', fr: 'Mon séjour à Miyama restera un souvenir pour la vie. J’ai vraiment eu l’impression de pouvoir dire « je suis chez moi ».', it: 'Il tempo trascorso a Miyama resterà con me per sempre. Ho sentito davvero di poter dire “sono a casa”.' } },
    ],
  },
}
