import { sections } from "@/data/copy/sections";
import type { Locale } from "@/types/content";
export function EngineeringDiagram({locale}:{locale:Locale}) {const c=sections[locale];return <figure className="engineering-diagram"><ol>{c.nodes.map((node,i)=><li key={node} data-node={i}><span>{node}</span>{i<3 && <span className="diagram-connection" aria-hidden="true" data-rule/>}</li>)}</ol><figcaption>{c.scope}</figcaption></figure>;}
