export const emailOk=(v:string)=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
export const phoneOk=(v:string)=>/^\+?\d{7,15}$/.test(v.replace(/[\s\-()]/g,''));
export const urlOk=(v:string)=>/^https?:\/\/\S+\.\S+/.test(v.trim());
export const MAX_CV=5*1024*1024;
export function cvProblem(f:File):string{if(!/\.(pdf|docx)$/i.test(f.name))return 'Only PDF or DOCX files are allowed.';if(f.size>MAX_CV)return 'File is larger than 5 MB.';if(f.size===0)return 'File is empty.';return ''}
