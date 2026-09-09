"use client";
import { useSyncExternalStore, useState } from "react";
import { Copy } from "lucide-react";
import { profile } from "@/data/profile";
const subscribe = () => () => {};
export function CopyEmailButton({labels}:{labels:{copy:string;copied:string;failed:string}}) {
 const ready=useSyncExternalStore(subscribe,()=>true,()=>false);const [status,setStatus]=useState("");
 return <div className="copy-email"><button type="button" className="button button-secondary" disabled={!ready} onClick={async()=>{try {await navigator.clipboard.writeText(profile.email);setStatus(labels.copied);}catch {setStatus(labels.failed);}}}>{labels.copy}<Copy size={16} aria-hidden="true"/></button><p className="copy-status" role="status" aria-live="polite">{status}</p></div>;
}
