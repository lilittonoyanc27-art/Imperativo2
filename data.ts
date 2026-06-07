/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TheorySection {
  title: string;
  elements: Array<{
    type: 'paragraph' | 'list' | 'table' | 'example' | 'text';
    content?: string;
    list?: string[];
    table?: {
      headers: string[];
      rows: string[][];
    };
    examples?: Array<{ spanish: string; armenian: string; note?: string }>;
  }>;
}

export const THEORY_CONTENT = `
<h2>Imperativo իսպաներենում — հրամայական եղանակ</h2>
<p>Imperativo նշանակում է հրամայական եղանակ։</p>
<p>Օգտագործվում է, երբ ուզում ենք՝<br/>
հրամայել, խնդրել, խորհուրդ տալ, արգելել, հրավիրել, ուղղություն տալ։</p>

<h3>Հայերենում՝</h3>
<p>արի՛, գնա՛, գրի՛ր, մի՛ խոսիր, լսե՛ք, եկե՛ք, օգնե՛ք։</p>

<h3>Օրինակներ՝</h3>
<ul>
  <li><strong>Ven aquí.</strong><br/>Արի այստեղ։</li>
  <li><strong>Escucha, por favor.</strong><br/>Լսիր, խնդրում եմ։</li>
  <li><strong>No hables.</strong><br/>Մի խոսիր։</li>
  <li><strong>Toma agua.</strong><br/>Ջուր խմիր։</li>
</ul>

<h3>Imperativo-ի հիմնական տեսակները</h3>
<p>Իսպաներենում հրամայականը կարելի է բաժանել այս հիմնական տեսակների․</p>
<ol>
  <li><strong>Imperativo afirmativo</strong> — դրական հրաման</li>
  <li><strong>Imperativo negativo</strong> — բացասական հրաման</li>
  <li><strong>Imperativo formal</strong> — քաղաքավարի հրաման՝ usted / ustedes</li>
  <li><strong>Imperativo con pronombres</strong> — դերանուններով հրաման</li>
  <li><strong>Imperativo con verbos reflexivos</strong> — վերադարձական բայերով հրաման</li>
  <li><strong>Imperativo irregular</strong> — անկանոն հրամաններ</li>
</ol>

<hr/>

<h3>1. Imperativo afirmativo — դրական հրաման</h3>
<p>Սա օգտագործում ենք, երբ ասում ենք ինչ-որ մեկին՝ արա՛։</p>
<p>Օրինակ՝</p>
<ul>
  <li><strong>Habla.</strong> — Խոսի՛ր։</li>
  <li><strong>Come.</strong> — Կեր։</li>
  <li><strong>Escribe.</strong> — Գրի՛ր։</li>
</ul>

<h3>2. Tú ձև — դու</h3>
<p>Tú ձևը օգտագործվում է ընկերների, երեխաների, ընտանիքի անդամների հետ։</p>

<h4>-AR բայեր</h4>
<p><strong>hablar → habla</strong></p>
<ul>
  <li><strong>Habla más despacio.</strong><br/>Խոսի՛ր ավելի դանդաղ։</li>
  <li><strong>Estudia español.</strong><br/>Սովորի՛ր իսպաներեն։</li>
  <li><strong>Mira la pizarra.</strong><br/>Նայի՛ր գրատախտակին։</li>
</ul>

<h4>-ER բայեր</h4>
<p><strong>comer → come</strong></p>
<ul>
  <li><strong>Come la sopa.</strong><br/>Կեր ապուրը։</li>
  <li><strong>Bebe agua.</strong><br/>Ջուր խմիր։</li>
  <li><strong>Lee el texto.</strong><br/>Կարդա տեքստը։</li>
</ul>

<h4>-IR բայեր</h4>
<p><strong>escribir → escribe</strong></p>
<ul>
  <li><strong>Escribe la frase.</strong><br/>Գրի՛ր նախադասությունը։</li>
  <li><strong>Vive tranquilo.</strong><br/>Ապրի՛ր հանգիստ։</li>
  <li><strong>Abre la puerta.</strong><br/>Բացի՛ր դուռը։</li>
</ul>

<h3>3. Tú ձևի կանոնը</h3>
<p>Դրական հրամանի tú ձևը շատ հաճախ նման է él / ella / usted ներկա ժամանակի ձևին։</p>
<table class="min-w-full divide-y divide-slate-200 my-4 text-sm">
  <thead>
    <tr class="bg-slate-50 text-left">
      <th class="p-2 font-semibold">Infinitivo</th>
      <th class="p-2 font-semibold">Él / ella presente</th>
      <th class="p-2 font-semibold">Imperativo tú</th>
    </tr>
  </thead>
  <tbody class="divide-y divide-slate-100">
    <tr>
      <td class="p-2 font-mono text-indigo-600">hablar</td>
      <td class="p-2 font-mono text-slate-700">habla</td>
      <td class="p-2 font-mono text-emerald-600 font-semibold">habla</td>
    </tr>
    <tr>
      <td class="p-2 font-mono text-indigo-600">comer</td>
      <td class="p-2 font-mono text-slate-700">come</td>
      <td class="p-2 font-mono text-emerald-600 font-semibold">come</td>
    </tr>
    <tr>
      <td class="p-2 font-mono text-indigo-600">escribir</td>
      <td class="p-2 font-mono text-slate-700">escribe</td>
      <td class="p-2 font-mono text-emerald-600 font-semibold">escribe</td>
    </tr>
  </tbody>
</table>
<p>Օրինակ՝</p>
<ul>
  <li><strong>Él habla.</strong> — Նա խոսում է։</li>
  <li><strong>Habla.</strong> — Խոսի՛ր։</li>
</ul>

<h3>4. Usted ձև — Դուք / քաղաքավարի</h3>
<p>Usted օգտագործում ենք, երբ խոսում ենք քաղաքավարի՝ մեծերի, անծանոթների կամ պաշտոնական իրավիճակում։</p>
<p>Այստեղ օգտագործվում է Presente de Subjuntivo-ի ձևը։</p>
<p>Օրինակներ՝</p>
<ul>
  <li><strong>Hable, por favor.</strong> — Խոսե՛ք, խնդրում եմ։</li>
  <li><strong>Coma despacio.</strong> — Կերե՛ք դանդաղ։</li>
  <li><strong>Escriba su nombre aquí.</strong> — Գրե՛ք Ձեր անունը այստեղ։</li>
</ul>

<h3>5. Ustedes ձև — Դուք / նրանք</h3>
<p>Ustedes ձևը օգտագործվում է մի քանի հոգու դիմելիս։<br/>
Լատինական Ամերիկայում սա սովորական «դուք» ձևն է։ Իսպանիայում էլ օգտագործվում է քաղաքավարի հոգնակիի համար։</p>
<p>Օրինակներ՝</p>
<ul>
  <li><strong>Hablen, por favor.</strong> — Խոսե՛ք, խնդրում եմ։</li>
  <li><strong>Coman ahora.</strong> — Կերե՛ք հիմա։</li>
  <li><strong>Escriban las respuestas.</strong> — Գրե՛ք պատասխանները։</li>
</ul>

<h3>6. Nosotros ձև — եկե՛ք անենք</h3>
<p>Nosotros ձևը նշանակում է՝ եկե՛ք անենք։</p>
<p>Հայերենում հաճախ թարգմանվում է՝ եկեք գնանք, եկեք խոսենք, եկեք սկսենք։</p>
<p>Օգտագործվում է նույնպես Subjuntivo-ի ձևով։</p>
<p>Օրինակներ՝</p>
<ul>
  <li><strong>Hablemos.</strong> — Եկեք խոսենք։</li>
  <li><strong>Comamos.</strong> — Եկեք ուտենք։</li>
  <li><strong>Escribamos.</strong> — Եկեք գրենք։</li>
  <li><strong>Vamos.</strong> — Գնանք / եկեք գնանք։</li>
  <li><strong>Estudiemos juntos.</strong> — Եկեք միասին սովորենք։</li>
</ul>

<h3>7. Vosotros ձև — դուք / Իսպանիա</h3>
<p>Vosotros հիմնականում օգտագործվում է Իսպանիայում՝ ոչ պաշտոնական հոգնակիի համար։</p>
<p>Կազմությունը պարզ է․ infinitivo-ի -r-ը փոխվում է -d-ի։</p>
<ul>
  <li><strong>hablar → hablad</strong> — Խոսե՛ք։</li>
  <li><strong>comer → comed</strong> — Կերե՛ք։</li>
  <li><strong>escribir → escribid</strong> — Գրե՛ք։</li>
</ul>
<p>Օրինակ նախադասություններ՝</p>
<ul>
  <li><strong>Hablad más alto.</strong> — Խոսե՛ք ավելի բարձր։</li>
  <li><strong>Comed la comida.</strong> — Կերե՛ք ուտելիքը։</li>
  <li><strong>Escribid en el cuaderno.</strong> — Գրե՛ք տետրում։</li>
</ul>

<hr/>

<h3>8. Imperativo negativo — բացասական հրաման</h3>
<p>Բացասական հրաման նշանակում է՝ մի՛ արա։</p>
<p>Իսպաներենում բացասական հրամանի համար օգտագործվում է <strong>no + Presente de Subjuntivo</strong>։</p>
<p>Օրինակ՝</p>
<ul>
  <li><strong>No hables.</strong> — Մի խոսիր։</li>
  <li><strong>No comas.</strong> — Մի կեր։</li>
  <li><strong>No escribas.</strong> — Մի գրիր։</li>
</ul>

<h3>9. Բացասական հրաման՝ tú</h3>
<table class="min-w-full divide-y divide-slate-200 my-4 text-sm">
  <thead>
    <tr class="bg-slate-50 text-left">
      <th class="p-2 font-semibold">Infinitivo</th>
      <th class="p-2 font-semibold">Imperativo negativo tú</th>
      <th class="p-2 font-semibold">Հայերեն</th>
    </tr>
  </thead>
  <tbody class="divide-y divide-slate-100">
    <tr>
      <td class="p-2 font-mono text-indigo-600">hablar</td>
      <td class="p-2 font-mono text-rose-600 font-semibold">no hables</td>
      <td class="p-2 text-slate-700">մի խոսիր</td>
    </tr>
    <tr>
      <td class="p-2 font-mono text-indigo-600">comer</td>
      <td class="p-2 font-mono text-rose-600 font-semibold">no comas</td>
      <td class="p-2 text-slate-700">մի կեր</td>
    </tr>
    <tr>
      <td class="p-2 font-mono text-indigo-600">escribir</td>
      <td class="p-2 font-mono text-rose-600 font-semibold">no escribas</td>
      <td class="p-2 text-slate-700">մի գրիր</td>
    </tr>
  </tbody>
</table>
<p>Օրինակներ՝</p>
<ul>
  <li><strong>No hables tan rápido.</strong> — Այդքան արագ մի խոսիր։</li>
  <li><strong>No comas mucho chocolate.</strong> — Շատ շոկոլադ մի կեր։</li>
  <li><strong>No escribas aquí.</strong> — Այստեղ մի գրիր։</li>
</ul>

<h3>10. Դրական և բացասական tú տարբերությունը</h3>
<p>Սա շատ կարևոր է։</p>
<table class="min-w-full divide-y divide-slate-200 my-4 text-sm">
  <thead>
    <tr class="bg-slate-50 text-left">
      <th class="p-2 font-semibold">Infinitivo</th>
      <th class="p-2 font-semibold text-emerald-600">Դրական tú</th>
      <th class="p-2 font-semibold text-rose-600">Բացասական tú</th>
    </tr>
  </thead>
  <tbody class="divide-y divide-slate-100">
    <tr>
      <td class="p-2 font-mono text-slate-600">hablar</td>
      <td class="p-2 font-mono text-emerald-600 font-semibold">habla</td>
      <td class="p-2 font-mono text-rose-600 font-semibold">no hables</td>
    </tr>
    <tr>
      <td class="p-2 font-mono text-slate-600">comer</td>
      <td class="p-2 font-mono text-emerald-600 font-semibold">come</td>
      <td class="p-2 font-mono text-rose-600 font-semibold">no comas</td>
    </tr>
    <tr>
      <td class="p-2 font-mono text-slate-600">escribir</td>
      <td class="p-2 font-mono text-emerald-600 font-semibold">escribe</td>
      <td class="p-2 font-mono text-rose-600 font-semibold">no escribas</td>
    </tr>
  </tbody>
</table>
<p>Օրինակներ՝</p>
<ul>
  <li><strong>Habla.</strong> (Խոսի՛ր։) — <strong>No hables.</strong> (Մի խոսիր։)</li>
  <li><strong>Come.</strong> (Կեր։) — <strong>No comas.</strong> (Մի կեր։)</li>
  <li><strong>Escribe.</strong> (Գրի՛ր։) — <strong>No escribas.</strong> (Մի գրիր։)</li>
</ul>

<h3>11. Imperativo-ի վերջավորությունները</h3>

<h4>Դրական հրաման</h4>
<table class="min-w-full divide-y divide-slate-200 my-4 text-sm">
  <thead>
    <tr class="bg-slate-50 text-left">
      <th class="p-2 font-semibold">Անձ</th>
      <th class="p-2 font-semibold">Hablar</th>
      <th class="p-2 font-semibold">Comer</th>
      <th class="p-2 font-semibold">Escribir</th>
    </tr>
  </thead>
  <tbody class="divide-y divide-slate-100 font-mono">
    <tr>
      <td class="p-2 font-sans font-medium text-slate-700">tú</td>
      <td class="p-2 text-indigo-600 font-semibold">habla</td>
      <td class="p-2 text-indigo-600 font-semibold">come</td>
      <td class="p-2 text-indigo-600 font-semibold">escribe</td>
    </tr>
    <tr>
      <td class="p-2 font-sans font-medium text-slate-700">usted</td>
      <td class="p-2 text-slate-600">hable</td>
      <td class="p-2 text-slate-600">coma</td>
      <td class="p-2 text-slate-600">escriba</td>
    </tr>
    <tr>
      <td class="p-2 font-sans font-medium text-slate-700">nosotros/as</td>
      <td class="p-2 text-slate-600">hablemos</td>
      <td class="p-2 text-slate-600">comamos</td>
      <td class="p-2 text-slate-600">escribamos</td>
    </tr>
    <tr>
      <td class="p-2 font-sans font-medium text-slate-700">vosotros/as</td>
      <td class="p-2 text-slate-600">hablad</td>
      <td class="p-2 text-slate-600">comed</td>
      <td class="p-2 text-slate-600">escribid</td>
    </tr>
    <tr>
      <td class="p-2 font-sans font-medium text-slate-700">ustedes</td>
      <td class="p-2 text-slate-600">hablen</td>
      <td class="p-2 text-slate-600">coman</td>
      <td class="p-2 text-slate-600">escriban</td>
    </tr>
  </tbody>
</table>

<h4>Բացասական հրաման</h4>
<table class="min-w-full divide-y divide-slate-200 my-4 text-sm">
  <thead>
    <tr class="bg-slate-50 text-left">
      <th class="p-2 font-semibold">Անձ</th>
      <th class="p-2 font-semibold">Hablar</th>
      <th class="p-2 font-semibold">Comer</th>
      <th class="p-2 font-semibold">Escribir</th>
    </tr>
  </thead>
  <tbody class="divide-y divide-slate-100 font-mono">
    <tr>
      <td class="p-2 font-sans font-medium text-slate-700">tú</td>
      <td class="p-2 text-rose-600 font-semibold">no hables</td>
      <td class="p-2 text-rose-600 font-semibold">no comas</td>
      <td class="p-2 text-rose-600 font-semibold">no escribas</td>
    </tr>
    <tr>
      <td class="p-2 font-sans font-medium text-slate-700">usted</td>
      <td class="p-2 text-slate-600">no hable</td>
      <td class="p-2 text-slate-600">no coma</td>
      <td class="p-2 text-slate-600">no escriba</td>
    </tr>
    <tr>
      <td class="p-2 font-sans font-medium text-slate-700">nosotros/as</td>
      <td class="p-2 text-slate-600">no hablemos</td>
      <td class="p-2 text-slate-600">no comamos</td>
      <td class="p-2 text-slate-600">no escribamos</td>
    </tr>
    <tr>
      <td class="p-2 font-sans font-medium text-slate-700">vosotros/as</td>
      <td class="p-2 text-slate-600">no habléis</td>
      <td class="p-2 text-slate-600">no comáis</td>
      <td class="p-2 text-slate-600">no escribáis</td>
    </tr>
    <tr>
      <td class="p-2 font-sans font-medium text-slate-700">ustedes</td>
      <td class="p-2 text-slate-600">no hablen</td>
      <td class="p-2 text-slate-600">no coman</td>
      <td class="p-2 text-slate-600">no escriban</td>
    </tr>
  </tbody>
</table>

<hr/>

<h3>12. Ամենակարևոր անկանոն հրամանները՝ tú դրական</h3>
<p>Այս ձևերը պետք է հիշել առանձին։</p>
<table class="min-w-full divide-y divide-slate-200 my-4 text-sm">
  <thead>
    <tr class="bg-slate-50 text-left">
      <th class="p-2 font-semibold">Infinitivo</th>
      <th class="p-2 font-semibold text-indigo-600">Imperativo tú</th>
      <th class="p-2 font-semibold">Հայերեն</th>
    </tr>
  </thead>
  <tbody class="divide-y divide-slate-100 font-mono">
    <tr>
      <td class="p-2 font-sans text-slate-700">decir</td>
      <td class="p-2 text-indigo-600 font-semibold">di</td>
      <td class="p-2 font-sans text-slate-700">ասա</td>
    </tr>
    <tr>
      <td class="p-2 font-sans text-slate-700">hacer</td>
      <td class="p-2 text-indigo-600 font-semibold">haz</td>
      <td class="p-2 font-sans text-slate-700">արա</td>
    </tr>
    <tr>
      <td class="p-2 font-sans text-slate-700">ir</td>
      <td class="p-2 text-indigo-600 font-semibold">ve</td>
      <td class="p-2 font-sans text-slate-700">գնա</td>
    </tr>
    <tr>
      <td class="p-2 font-sans text-slate-700">poner</td>
      <td class="p-2 text-indigo-600 font-semibold">pon</td>
      <td class="p-2 font-sans text-slate-700">դիր</td>
    </tr>
    <tr>
      <td class="p-2 font-sans text-slate-700">salir</td>
      <td class="p-2 text-indigo-600 font-semibold">sal</td>
      <td class="p-2 font-sans text-slate-700">դուրս արի</td>
    </tr>
    <tr>
      <td class="p-2 font-sans text-slate-700">ser</td>
      <td class="p-2 text-indigo-600 font-semibold">sé</td>
      <td class="p-2 font-sans text-slate-700">եղիր</td>
    </tr>
    <tr>
      <td class="p-2 font-sans text-slate-700">tener</td>
      <td class="p-2 text-indigo-600 font-semibold">ten</td>
      <td class="p-2 font-sans text-slate-700">ունեցիր / պահիր</td>
    </tr>
    <tr>
      <td class="p-2 font-sans text-slate-700">venir</td>
      <td class="p-2 text-indigo-600 font-semibold">ven</td>
      <td class="p-2 font-sans text-slate-700">արի</td>
    </tr>
  </tbody>
</table>
<p>Օրինակներ՝</p>
<ul>
  <li><strong>Di la verdad.</strong> — Ասա ճշմարտությունը։</li>
  <li><strong>Haz la tarea.</strong> — Արա տնայինը։</li>
  <li><strong>Ve a casa.</strong> — Գնա տուն։</li>
  <li><strong>Pon el libro en la mesa.</strong> — Դիր գիրքը սեղանին։</li>
  <li><strong>Sal de aquí.</strong> — Դուրս արի այստեղից։</li>
  <li><strong>Sé amable.</strong> — Եղիր բարի։</li>
  <li><strong>Ten cuidado.</strong> — Զգույշ եղիր։</li>
  <li><strong>Ven aquí.</strong> — Արի այստեղ։</li>
</ul>

<h3>13. Բացասական ձևերը նույն բայերով</h3>
<p>Բացասական հրամանի ժամանակ դրանք գնում են Subjuntivo-ով։</p>
<table class="min-w-full divide-y divide-slate-200 my-4 text-sm">
  <thead>
    <tr class="bg-slate-50 text-left">
      <th class="p-2 font-semibold">Infinitivo</th>
      <th class="p-2 font-semibold text-emerald-600">Դրական tú</th>
      <th class="p-2 font-semibold text-rose-600">Բացասական tú</th>
    </tr>
  </thead>
  <tbody class="divide-y divide-slate-100 font-mono">
    <tr>
      <td class="p-2 font-sans text-slate-700">decir</td>
      <td class="p-2 text-emerald-600">di</td>
      <td class="p-2 text-rose-600 font-semibold">no digas</td>
    </tr>
    <tr>
      <td class="p-2 font-sans text-slate-700">hacer</td>
      <td class="p-2 text-emerald-600">haz</td>
      <td class="p-2 text-rose-600 font-semibold">no hagas</td>
    </tr>
    <tr>
      <td class="p-2 font-sans text-slate-700">ir</td>
      <td class="p-2 text-emerald-600">ve</td>
      <td class="p-2 text-rose-600 font-semibold">no vayas</td>
    </tr>
    <tr>
      <td class="p-2 font-sans text-slate-700">poner</td>
      <td class="p-2 text-emerald-600">pon</td>
      <td class="p-2 text-rose-600 font-semibold">no pongas</td>
    </tr>
    <tr>
      <td class="p-2 font-sans text-slate-700">salir</td>
      <td class="p-2 text-emerald-600">sal</td>
      <td class="p-2 text-rose-600 font-semibold">no salgas</td>
    </tr>
    <tr>
      <td class="p-2 font-sans text-slate-700">ser</td>
      <td class="p-2 text-emerald-600">sé</td>
      <td class="p-2 text-rose-600 font-semibold">no seas</td>
    </tr>
    <tr>
      <td class="p-2 font-sans text-slate-700">tener</td>
      <td class="p-2 text-emerald-600">ten</td>
      <td class="p-2 text-rose-600 font-semibold">no tengas</td>
    </tr>
    <tr>
      <td class="p-2 font-sans text-slate-700">venir</td>
      <td class="p-2 text-emerald-600">ven</td>
      <td class="p-2 text-rose-600 font-semibold">no vengas</td>
    </tr>
  </tbody>
</table>
<p>Օրինակներ՝</p>
<ul>
  <li><strong>Di la verdad.</strong> (Ասա ճշմարտությունը։) — <strong>No digas mentiras.</strong> (Սուտ մի ասա։)</li>
  <li><strong>Haz la tarea.</strong> (Արա տնայինը։) — <strong>No hagas ruido.</strong> (Աղմուկ մի արա։)</li>
  <li><strong>Ve al colegio.</strong> (Գնա դպրոց։) — <strong>No vayas solo.</strong> (Մի գնա մենակ։)</li>
</ul>

<hr/>

<h3>14. Դերանուններով Imperativo</h3>
<p>Իսպաներենում հրամայականի հետ կարող են լինել դերանուններ՝<br/>
<em>me (ինձ), te (քեզ), lo / la (նրան / դա), nos (մեզ), os (ձեզ), los / las (նրանց / դրանք)</em></p>

<h4>Դրական հրամանի դեպքում դերանունը կպչում է բայի վերջում</h4>
<ul>
  <li><strong>Ayúdame.</strong> — Օգնիր ինձ։</li>
  <li><strong>Escúchame.</strong> — Լսիր ինձ։</li>
  <li><strong>Dímelo.</strong> — Ասա դա ինձ։</li>
  <li><strong>Cómelo.</strong> — Կեր դա։</li>
  <li><strong>Escríbeme.</strong> — Գրիր ինձ։</li>
</ul>
<p><em>Ուշադրություն՝ երբ դերանունը կպչում է, երբեմն դրվում է շեշտ.</em><br/>
<strong>di + me + lo → dímelo</strong> — ասա դա ինձ</p>

<h4>Բացասական հրամանի դեպքում դերանունը գալիս է բայից առաջ</h4>
<ul>
  <li><strong>No me ayudes.</strong> — Մի օգնիր ինձ։</li>
  <li><strong>No me escuches.</strong> — Մի լսիր ինձ։</li>
  <li><strong>No me lo digas.</strong> — Մի ասա դա ինձ։</li>
  <li><strong>No lo comas.</strong> — Մի կեր դա։</li>
  <li><strong>No me escribas.</strong> — Մի գրիր ինձ։</li>
</ul>

<hr/>

<h3>15. Վերադարձական բայերով Imperativo</h3>
<p>Վերադարձական բայերն ունեն <strong>-se</strong> վերջավորություն։</p>
<p>Օրինակ՝<br/>
<em>levantarse — վեր կենալ, ducharse — ցնցուղ ընդունել, vestirse — հագնվել, sentarse — նստել, acostarse — պառկել / քնել գնալ</em></p>

<h3>16. Դրական հրաման վերադարձական բայերով</h3>
<p>Դերանունը կպչում է բայի վերջում։</p>

<h4>Tú</h4>
<ul>
  <li><strong>Levántate.</strong> — Վե՛ր կաց։</li>
  <li><strong>Dúchate.</strong> — Ցնցուղ ընդունիր։</li>
  <li><strong>Vístete.</strong> — Հագնվիր։</li>
  <li><strong>Siéntate.</strong> — Նստիր։</li>
  <li><strong>Acuéstate.</strong> — Պառկիր / քնի գնա։</li>
</ul>

<h4>Usted</h4>
<ul>
  <li><strong>Levántese.</strong> — Վեր կացեք։</li>
  <li><strong>Dúchese.</strong> — Ցնցուղ ընդունեք։</li>
  <li><strong>Siéntese.</strong> — Նստեք։</li>
</ul>

<h4>Ustedes</h4>
<ul>
  <li><strong>Levántense.</strong> — Վեր կացեք։</li>
  <li><strong>Dúchense.</strong> — Ցնցուղ ընդունեք։</li>
  <li><strong>Siéntense.</strong> — Նստեք։</li>
</ul>

<h3>17. Բացասական հրաման վերադարձական բայերով</h3>
<p>Բացասականում դերանունը դրվում է բայից առաջ։</p>

<h4>Tú</h4>
<ul>
  <li><strong>No te levantes.</strong> — Վեր մի կաց։</li>
  <li><strong>No te duches.</strong> — Ցնցուղ մի ընդունիր։</li>
  <li><strong>No te vistas ahora.</strong> — Հիմա մի հագնվիր։</li>
  <li><strong>No te sientes aquí.</strong> — Այստեղ մի նստիր։</li>
  <li><strong>No te acuestes tarde.</strong> — Ուշ մի պառկիր։</li>
</ul>

<h4>Usted</h4>
<ul>
  <li><strong>No se levante.</strong> — Վեր մի կացեք։</li>
  <li><strong>No se siente aquí.</strong> — Այստեղ մի նստեք։</li>
</ul>

<h4>Ustedes</h4>
<ul>
  <li><strong>No se levanten.</strong> — Վեր մի կացեք։</li>
  <li><strong>No se sienten aquí.</strong> — Այստեղ մի նստեք։</li>
</ul>

<h3>18. Nosotros վերադարձական բայերով</h3>
<p>Nosotros նշանակում է՝ եկեք անենք։</p>
<p>Օրինակ՝ <em>levantarse</em></p>
<ul>
  <li><strong>Levantémonos.</strong> — Եկեք վեր կենանք։</li>
  <li><strong>Duchémonos.</strong> — Եկեք ցնցուղ ընդունենք։</li>
  <li><strong>Sentémonos.</strong> — Եկեք նստենք։</li>
</ul>
<p><em>Բայց irse բայի հետ շատ կարևոր է․</em><br/>
<strong>Vámonos.</strong> — Գնանք / եկեք գնանք։</p>
<p>Բացասական՝</p>
<ul>
  <li><strong>No nos levantemos.</strong> — Եկեք վեր չկենանք։</li>
  <li><strong>No nos vayamos.</strong> — Եկեք չգնանք։</li>
</ul>

<h3>19. Vosotros վերադարձական բայերով</h3>
<p>Իսպանիայում՝ ոչ պաշտոնական «դուք»։</p>
<p>Դրականում -d-ը ընկնում է, երբ միանում է <strong>os</strong> դերանունը։</p>
<ul>
  <li><strong>levantaos</strong> — վեր կացեք</li>
  <li><strong>duchaos</strong> — ցնցուղ ընդունեք</li>
  <li><strong>sentaos</strong> — նստեք</li>
</ul>
<p><em>Բայց irse բայը՝</em><br/>
<strong>idos</strong> կամ խոսակցականում շատ տարածված <strong>iros</strong> — գնացեք</p>

<hr/>

<h3>20. Imperativo քաղաքավարի խոսքում</h3>
<p>Քաղաքավարի հրամանը շատ հաճախ օգտագործվում է՝<br/>
<em>por favor (խնդրում եմ), cuando pueda (երբ կարողանաք), si puede (եթե կարող եք)</em></p>
<p>Օրինակներ՝</p>
<ul>
  <li><strong>Espere un momento, por favor.</strong> — Սպասե՛ք մի պահ, խնդրում եմ։</li>
  <li><strong>Escriba su nombre aquí, por favor.</strong> — Գրե՛ք Ձեր անունը այստեղ, խնդրում եմ։</li>
  <li><strong>Pase, por favor.</strong> — Անցե՛ք / ներս եկեք, խնդրում եմ։</li>
  <li><strong>Siéntese aquí, por favor.</strong> — Նստե՛ք այստեղ, խնդրում եմ։</li>
</ul>

<h3>21. Ամենօրյա հրամաններ</h3>
<ul>
  <li><strong>Escucha.</strong> — Լսիր։</li>
  <li><strong>Repite.</strong> — Կրկնիր։</li>
  <li><strong>Lee el texto.</strong> — Կարդա տեքստը։</li>
  <li><strong>Escribe la respuesta.</strong> — Գրիր պատասխանը։</li>
  <li><strong>Abre el libro.</strong> — Բացիր գիրքը։</li>
  <li><strong>Cierra la puerta.</strong> — Փակիր դուռը։</li>
  <li><strong>Mira aquí.</strong> — Նայիր այստեղ։</li>
  <li><strong>Ven conmigo.</strong> — Արի ինձ հետ։</li>
  <li><strong>No corras.</strong> — Մի վազիր։</li>
  <li><strong>No grites.</strong> — Մի գոռա։</li>
</ul>

<h3>22. Imperativo և Infinitivo տարբերությունը</h3>
<p>Շատ կարևոր է․ իսպաներենում հրաման տալու համար սովորաբար պետք չէ օգտագործել infinitivo։</p>
<p>Սխալ կամ շատ ոչ բնական՝<br/>
<span class="text-rose-600 line-through">Hablar.</span> (Խոսել։)</p>
<p>Ճիշտ՝<br/>
<span class="text-emerald-600 font-semibold">Habla.</span> (Խոսի՛ր։)</p>
<p>Բայց ցուցանակներում կամ ընդհանուր հրահանգներում infinitivo կարող է լինել։<br/>
Օրինակ՝</p>
<ul>
  <li><strong>No fumar.</strong> — Չծխել։</li>
  <li><strong>No tocar.</strong> — Չդիպչել։</li>
</ul>
<p><em>Սա ոչ թե ուղիղ խոսակցական հրաման է, այլ ընդհանուր կանոն / ցուցանակ։</em></p>

<h3>23. Կարճ համեմատություն</h3>
<table class="min-w-full divide-y divide-slate-200 my-4 text-sm">
  <thead>
    <tr class="bg-slate-50 text-left">
      <th class="p-2 font-semibold">Իսպաներեն</th>
      <th class="p-2 font-semibold font-sans">Հայերեն</th>
    </tr>
  </thead>
  <tbody class="divide-y divide-slate-100 font-mono">
    <tr>
      <td class="p-2 text-indigo-600 font-semibold">habla</td>
      <td class="p-2 font-sans text-slate-700">խոսիր</td>
    </tr>
    <tr>
      <td class="p-2 text-indigo-600 font-semibold">no hables</td>
      <td class="p-2 font-sans text-slate-700">մի խոսիր</td>
    </tr>
    <tr>
      <td class="p-2 text-indigo-600 font-semibold">hable</td>
      <td class="p-2 font-sans text-slate-700">խոսեք</td>
    </tr>
    <tr>
      <td class="p-2 text-indigo-600 font-semibold">hablen</td>
      <td class="p-2 font-sans text-slate-700">խոսեք</td>
    </tr>
    <tr>
      <td class="p-2 text-indigo-600 font-semibold">hablemos</td>
      <td class="p-2 font-sans text-slate-700">եկեք խոսենք</td>
    </tr>
    <tr>
      <td class="p-2 text-indigo-600 font-semibold">hablad</td>
      <td class="p-2 font-sans text-slate-700">խոսեք</td>
    </tr>
    <tr>
      <td class="p-2 text-indigo-600 font-semibold">ayúdame</td>
      <td class="p-2 font-sans text-slate-700">օգնիր ինձ</td>
    </tr>
    <tr>
      <td class="p-2 text-indigo-600 font-semibold">no me ayudes</td>
      <td class="p-2 font-sans text-slate-700">մի օգնիր ինձ</td>
    </tr>
    <tr>
      <td class="p-2 text-indigo-600 font-semibold">levántate</td>
      <td class="p-2 font-sans text-slate-700">վեր կաց</td>
    </tr>
    <tr>
      <td class="p-2 text-indigo-600 font-semibold">no te levantes</td>
      <td class="p-2 font-sans text-slate-700">վեր մի կաց</td>
    </tr>
  </tbody>
</table>

<h3>24. Փոքրիկ դիալոգ Imperativo-ով</h3>
<div class="bg-indigo-50/50 rounded-xl p-4 my-4 space-y-4 border border-indigo-100">
  <div>
    <p class="font-semibold text-slate-900 border-b border-indigo-100 pb-1">Իսպաներեն՝</p>
    <p class="mt-2 text-slate-800 space-y-1">
      <strong>Profesora:</strong> Chicos, abrid los libros, por favor.<br/>
      <strong>Carlos:</strong> ¿Leemos el texto?<br/>
      <strong>Profesora:</strong> Sí, leed el texto y escribid las respuestas.<br/>
      <strong>Lucía:</strong> Profesora, no entiendo esta palabra.<br/>
      <strong>Profesora:</strong> Pregúntame, Lucía. No tengas miedo.<br/>
      <strong>Carlos:</strong> ¿Podemos trabajar juntos?<br/>
      <strong>Profesora:</strong> Sí, trabajad juntos, pero no habléis muy alto.
    </p>
  </div>
  <div>
    <p class="font-semibold text-slate-900 border-b border-indigo-100 pb-1">Հայերեն՝</p>
    <p class="mt-2 text-slate-700 space-y-1">
      <strong>Ուսուցչուհի:</strong> Երեխաներ, բացե՛ք գրքերը, խնդրում եմ։<br/>
      <strong>Կառլոս:</strong> Կարդո՞ւմ ենք տեքստը։<br/>
      <strong>Ուսուցչուհի:</strong> Այո, կարդացե՛ք տեքստը և գրե՛ք պատասխանները։<br/>
      <strong>Լուսիա:</strong> Ուսուցչուհի, ես այս բառը չեմ հասկանում։<br/>
      <strong>Ուսուցչուհի:</strong> Հարցրու ինձ, Լուսիա։ Մի վախեցիր։<br/>
      <strong>Կառլոս:</strong> Կարո՞ղ ենք միասին աշխատել։<br/>
      <strong>Ուսուցչուհի:</strong> Այո, աշխատե՛ք միասին, բայց շատ բարձր մի խոսեք։
    </p>
  </div>
</div>

<hr/>

<h3>Ամենակարճ հիշելու ձև</h3>
<ul>
  <li><strong>Դրական հրաման՝ tú</strong><br/>habla, come, escribe — խոսիր, կեր, գրիր</li>
  <li><strong>Բացասական հրաման՝ tú</strong><br/>no hables, no comas, no escribas — մի խոսիր, մի կեր, մի գրիր</li>
  <li><strong>Քաղաքավարի</strong><br/>hable, coma, escriba — խոսեք, կերեք, գրեք</li>
  <li><strong>Դերանունով</strong><br/>ayúdame — օգնիր ինձ<br/>no me ayudes — մի օգնիր ինձ</li>
  <li><strong>Վերադարձական</strong><br/>levántate — վեր կաց<br/>no te levantes — վեր մի կաց</li>
</ul>
`;

// Game 1 Data: Phrase Matcher
export interface MatchItem {
  id: string;
  text: string;
  lang: 'arm' | 'esp';
  pairId: string;
}

export const MATCH_PAIRS_DATA: MatchItem[] = [
  // Pair 1
  { id: 'arm1', text: 'Արի այստեղ։', lang: 'arm', pairId: '1' },
  { id: 'esp1', text: 'Ven aquí.', lang: 'esp', pairId: '1' },
  // Pair 2
  { id: 'arm2', text: 'Մի խոսիր։', lang: 'arm', pairId: '2' },
  { id: 'esp2', text: 'No hables.', lang: 'esp', pairId: '2' },
  // Pair 3
  { id: 'arm3', text: 'Կերե՛ք դանդաղ։', lang: 'arm', pairId: '3' },
  { id: 'esp3', text: 'Coma despacio.', lang: 'esp', pairId: '3' },
  // Pair 4
  { id: 'arm4', text: 'Օգնիր ինձ։', lang: 'arm', pairId: '4' },
  { id: 'esp4', text: 'Ayúdame.', lang: 'esp', pairId: '4' },
  // Pair 5
  { id: 'arm5', text: 'Վե՛ր կաց։', lang: 'arm', pairId: '5' },
  { id: 'esp5', text: 'Levántate.', lang: 'esp', pairId: '5' },
  // Pair 6
  { id: 'arm6', text: 'Մի՛ վախեցիր։', lang: 'arm', pairId: '6' },
  { id: 'esp6', text: 'No tengas miedo.', lang: 'esp', pairId: '6' },
];

// Game 2 Data: Fill-in-the-gap Conjugator
export interface ConjugationQuestion {
  id: number;
  armenianSentence: string;
  spanishBase: string; // e.g. "hacer la tarea (tú)"
  promptText: string; // e.g. "____ la tarea."
  options: string[];
  correctAnswer: string;
  explanationArm: string;
  helperSpan: string; // "hacer (tú, դրական)"
}

export const CONJUGATION_QUESTIONS: ConjugationQuestion[] = [
  {
    id: 1,
    armenianSentence: 'Արա տնայինը։',
    spanishBase: 'hacer la tarea',
    promptText: '____ la tarea.',
    options: ['haz', 'hace', 'hagas', 'no hagas'],
    correctAnswer: 'haz',
    helperSpan: 'hacer (tú, դրական)',
    explanationArm: '«hacer» բայի tú դրական հրամայականը անկանոն է՝ դառնալով «haz»։ «hace»-ն սովորական ներկա ժամանակի ձևն է, իսկ «hagas»-ը օգտագործվում է միայն բացասականում։',
  },
  {
    id: 2,
    armenianSentence: 'Այդքան արագ մի խոսիր։',
    spanishBase: 'no hablar tan rápido',
    promptText: '____ tan rápido.',
    options: ['No hables', 'No habla', 'No hable', 'No hablas'],
    correctAnswer: 'No hables',
    helperSpan: 'hablar (tú, բացասական)',
    explanationArm: 'Բացասական հրամանականում tú ձևի համար օգտագործում ենք «no + Subjuntivo»: «hablar» բայի համար դա կլինի «no hables»։',
  },
  {
    id: 3,
    armenianSentence: 'Գրե՛ք Ձեր անունը այստեղ (քաղաքավարի usted)։',
    spanishBase: 'escribir su nombre aquí',
    promptText: '____ su nombre aquí, por favor.',
    options: ['Escribა', 'Escribe', 'Escriban', 'Escribas'],
    correctAnswer: 'Escriba',
    helperSpan: 'escribir (usted, դրական)',
    explanationArm: 'Քաղաքավարի «usted» ձևի դեպքում օգտագործվում է Presente de Subjuntivo-ի ձևը: «escribir» բայի համար դա «escriba»-ն է:',
  },
  {
    id: 4,
    armenianSentence: 'Եկեք միասին սովորենք։',
    spanishBase: 'estudiar juntos',
    promptText: '____ juntos.',
    options: ['Estudiemos', 'Estudiamos', 'Estudiad', 'Estudien'],
    correctAnswer: 'Estudiemos',
    helperSpan: 'estudiar (nosotros, եկե՛ք անենք)',
    explanationArm: '«Եկե՛ք անենք» նշանակությունը տալու համար օգտագործվում է Nosotros + Subjuntivo ձևը: «estudiar» բայի համար այն է «estudiemos»։',
  },
  {
    id: 5,
    armenianSentence: 'Ցնցուղ ընդունեք (քաղաքավարի usted)։',
    spanishBase: 'ducharse (usted)',
    promptText: '____, por favor.',
    options: ['Dúchese', 'Dúchate', 'Dúchense', 'No se duche'],
    correctAnswer: 'Dúchese',
    helperSpan: 'ducharse (usted, դրական վերադարձական)',
    explanationArm: '«usted»-ի համար դերանունը «se»-ն է, որը դրական հրամանում միանում է բայի վերջում, իսկ բայը ստանում է Subjuntivo «dúche» ձևը ՝ դառնալով «Dúchese»:',
  }
];

// Game 3 Data: Afirmativo vs Negativo Sorter
export interface SortCard {
  id: string;
  phrase: string;
  translation: string;
  type: 'afirmativo' | 'negativo';
  explanation: string;
}

export const SORT_CARDS_DATA: SortCard[] = [
  {
    id: 's1',
    phrase: '¡Ven aquí!',
    translation: 'Արի այստեղ։',
    type: 'afirmativo',
    explanation: 'Սա դրական անկանոն հրաման է tú դեմքով (venir բայից):'
  },
  {
    id: 's2',
    phrase: '¡No hables tan rápido!',
    translation: 'Այդքան արագ մի խոսիր։',
    type: 'negativo',
    explanation: 'Սա բացասական հրաման է: Օգտագործում է «no + Presente de Subjuntivo» (hables):'
  },
  {
    id: 's3',
    phrase: '¡Hablemos juntos!',
    translation: 'Եկեք խոսենք միասին։',
    type: 'afirmativo',
    explanation: 'Դրական հրաման Nosotros դեմքով (եկե՛ք անենք)` Subjuntivo-ով:'
  },
  {
    id: 's4',
    phrase: '¡No digas mentiras!',
    translation: 'Սուտ մի ասա։',
    type: 'negativo',
    explanation: 'Բացասական անկանոն հրաման (decir բայից):'
  },
  {
    id: 's5',
    phrase: '¡Levántate!',
    translation: 'Վե՛ր կաց։',
    type: 'afirmativo',
    explanation: 'Վերադարձական բայի (levantarse) դրական հրաման, որտեղ դերանունը կպչում է բայի վերջում:'
  },
  {
    id: 's6',
    phrase: '¡No te sientes aquí!',
    translation: 'Այստեղ մի նստիր։',
    type: 'negativo',
    explanation: 'Բացասական վերադարձական հրաման, որտեղ դերանունը բայից առաջ է դրվում:'
  }
];

// Game 4 Data: Dialogue Selector
export interface DialogueStep {
  id: number;
  character: string;
  avatar: string;
  contextArm: string;
  dialogueBefore: string;
  missingPart: string;
  dialogueAfter: string;
  options: string[];
  correctValue: string;
  explanationArm: string;
}

export const DIALOGUE_STEPS: DialogueStep[] = [
  {
    id: 1,
    character: 'Ուսուցչուհի',
    avatar: '👩‍🏫',
    contextArm: 'Ուսուցչուհին դիմում է երեխաներին (vosotros)՝ խնդրելով բացել գրքերը։',
    dialogueBefore: 'Chicos, ',
    missingPart: '_________',
    dialogueAfter: ' los libros, por favor.',
    options: ['abrid', 'abrir', 'abran', 'no abráis'],
    correctValue: 'abrid',
    explanationArm: 'Իսպանիայում ընկերական կամ երեխաներին դիմելիս (vosotros) դրական հրամանը ստացվում է infinitivo-ի «-r» վերջավորությունը «-d»-ով փոխարինելով` «abrir» -> «abrid»։'
  },
  {
    id: 2,
    character: 'Ուսուցչուհի',
    avatar: '👩‍🏫',
    contextArm: 'Ուսուցչուհին Լուսիային քաջալերում է հարցնել իրեն և չվախենալ։',
    dialogueBefore: 'Lucía, ',
    missingPart: '_________',
    dialogueAfter: '. No tengas miedo.',
    options: ['Pregúntame', 'No me preguntes', 'Pregúntase', 'Pregúntanos'],
    correctValue: 'Pregúntame',
    explanationArm: 'Դրական հրամանի դեպքում (Pregunta - հարցրու) դերանունը (me - ինձ) կպչում է բայի վերջում՝ ստեղծելով մեկ բառ՝ «Pregúntame»։'
  },
  {
    id: 3,
    character: 'Ուսուցչուհի',
    avatar: '👩‍🏫',
    contextArm: 'Ուսուցչուհին թույլատրում է միասին աշխատել, բայց խնդրում է բարձր չխոսել (vosotros-ի բացասական):',
    dialogueBefore: 'Sí, trabajad juntos, pero no ',
    missingPart: '_________',
    dialogueAfter: ' muy alto.',
    options: ['habléis', 'hablad', 'hablen', 'habláis'],
    correctValue: 'habléis',
    explanationArm: 'Vosotros-ի բացասական հրամանը կազմվում է no + Subjuntivo vosotros ձևով: «hablar» բայի համար դա «habléis»-ն է (դրականի «hablad»-ի փոխարեն)։'
  }
];

// Game 5 Data: Sentence Puzzle Constructor
export interface PuzzleItem {
  id: number;
  armenianPrompt: string;
  correctSentence: string[]; // Correct order of tokens
  allTokens: string[]; // Shuffled tokens (or include distractors)
  explanationArm: string;
}

export const PUZZLE_ITEMS: PuzzleItem[] = [
  {
    id: 1,
    armenianPrompt: 'Ասա դա ինձ: (decir + me + lo)',
    correctSentence: ['Dímelo'],
    allTokens: ['Dímelo', 'No', 'me', 'lo', 'días', 'di'],
    explanationArm: 'Դրական հրամանում դերանունները (me և lo) միանում են բային և գրվում վերջում, զբաղեցնելով «բայ + անուղղակի դերանուն + ուղիղ դերանուն» հերթականությունը: di + me + lo = dímelo:'
  },
  {
    id: 2,
    armenianPrompt: 'Մի՛ ասա դա ինձ: (no + me + lo + decir)',
    correctSentence: ['No', 'me', 'lo', 'digas'],
    allTokens: ['No', 'me', 'lo', 'digas', 'días', 'dímelo'],
    explanationArm: 'Բացասական հրամանում դերանունները դրվում են բայից ԱՌԱՋ և առանձին: Հերթականությունը նույնն է՝ No + անուղղակի (me) + ուղիղ (lo) + բայ (digas):'
  },
  {
    id: 3,
    armenianPrompt: 'Եկեք վեր կենանք: (levantarse - nosotros)',
    correctSentence: ['Levantémonos'],
    allTokens: ['Levantémonos', 'No', 'nos', 'levantemos', 'levantamos'],
    explanationArm: 'Դրական հրաման Nosotros վերադարձական բայով. «levantemos»-ից վերջին «s»-ը ընկնում է, երբ միանում է «nos»-ը՝ դառնալով «Levantémonos»:'
  },
  {
    id: 4,
    armenianPrompt: 'Մի՛ վեր կաց (tú-բացասական վերադարձական)։',
    correctSentence: ['No', 'te', 'levantes'],
    allTokens: ['No', 'te', 'levantes', 'no', 'levantate', 'levántate'],
    explanationArm: 'Բացասական վերադարձական հրաման tú դեմքով. «no»-ից հետո դրվում է վերադարձական «te» դերանունը, ապա բայը Subjuntivo-ով ՝ «levantes»:'
  }
];
