// Google Apps Script – új, kizárólag ehhez a kvízhez használt Google Táblázatban
const SHEET_NAME = 'Eredmenyek';
const HEADERS = ['Beküldés ideje','Név / azonosító','Osztály','Pont','Összes kérdés','Idő (mp)','Kliens befejezési ideje'];
function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) { sh = ss.insertSheet(SHEET_NAME); sh.appendRow(HEADERS); sh.setFrozenRows(1); }
  return sh;
}
function output_(obj) { return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }
function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents || '{}');
    if (d.action !== 'submit') throw new Error('Ismeretlen művelet');
    const name=String(d.name||'').trim().slice(0,60), klass=String(d.klass||'').trim().slice(0,30);
    const score=Number(d.score), total=Number(d.total), seconds=Number(d.seconds);
    if(name.length<2 || !klass || total!==12 || !Number.isInteger(score) || score<0 || score>total || !Number.isInteger(seconds) || seconds<1 || seconds>86400) throw new Error('Érvénytelen adat');
    // A Sheets képletinjekciót akadályozzuk meg.
    const literal=s=>/^[=+@\-]/.test(s)?"'"+s:s;
    const lock=LockService.getScriptLock();lock.waitLock(10000);
    try { getSheet_().appendRow([new Date(),literal(name),literal(klass),score,total,seconds,String(d.finishedAt||'').slice(0,40)]); }
    finally { lock.releaseLock(); }
    return output_({ok:true});
  } catch(err) { return output_({ok:false,error:String(err)}); }
}
function doGet(e) {
  try {
    if ((e.parameter.action||'') !== 'leaderboard') return output_({ok:false,error:'Ismeretlen művelet'});
    const sh=getSheet_();const n=sh.getLastRow();
    const data=n>1?sh.getRange(2,1,n-1,7).getValues():[];
    const rows=data.map(r=>({name:String(r[1]),klass:String(r[2]),score:Number(r[3]),total:Number(r[4]),seconds:Number(r[5])}));
    return output_({ok:true,rows});
  }catch(err){return output_({ok:false,error:String(err)})}
}
