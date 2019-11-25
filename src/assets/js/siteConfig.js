'use strict'

export const threatCategories = {
  el: {
    text: 'Eliminado',
    color: '#AD322A'
  },
  cr: {
    text: 'En Peligro Crítico',
    color: '#DE6124'
  },
  en: {
    text: 'En Peligro',
    color: '#F8941E'
  },
  vu: {
    text: 'Vulnerable',
    color: '#FFD979'
  },
  nt: {
    text: 'Casi Amenazado',
    color: '#77C151'
  },
  lc: {
    text: 'Preocupación Menor',
    color: '#00B7B1'
  },
  dd: {
    text: 'Datos Insuficientes',
    color: '#00BAF1'
  },
  ne: {
    text: 'No Evaluado',
    color: '#0068B4'
  }
}

export const criteria = {
  A: 'Disminución en el corto plazo (en distribución o en función ecológica)',
  B: 'Disminución histórica (en distribución o en función ecológica)',
  C: 'Distribución actual pequeña y en disminución o en muy pocas localidades (en distribución o en función ecológica)',
  A1: 'Reducción observada, estimada, inferida o sospechada en su distribución, durante los últimos 50 años: CR ≥ 80%, EN ≥ 50%, VU ≥ 30%',
  A2: 'Reducción proyectada o sospechada en su distribución, en los próximos 50 años: CR ≥ 80%, EN ≥ 50%, VU ≥ 30%',
  A3: 'Reducción observada, estimada, inferida, proyectada o sospechada en su distribución pasada o futura, en un intervalo de 50 años, que incluye el pasado y el futuro: CR ≥ 80%, EN ≥ 50%, VU ≥ 30%',
  A4: 'Reducción o posible reducción en su función ecológica, en al menos un proceso ecológico fundamental (en relación con un estado de referencia apropiado para el ecosistema): CR - muy severa, en ≥80% de su distribución durante los últimos o próximos 50 años, EN - muy severa, en ≥50% de su distribución durante los últimos o próximos 50 años,  EN - severa, en ≥80% de su distribución durante los últimos o próximos 50 años, VU - muy severa, en ≥30% de su distribución durante los últimos o próximos 50 años, VU - severa, en ≥50% de su distribución durante los últimos o próximos 50 años, VU - moderadamente severa, en ≥80% de su distribución durante los últimos o próximos 50 años',
  B1: 'Reducción estimada, inferida o sospechada en su distribución durante los últimos 500 años: CR ≥ 90%, EN ≥ 70%, VU ≥ 50%',
  B2: 'Reducción muy severa en al menos un proceso ecológico fundamental de su distribución, durante los últimos 500 años (en relación con un estado de referencia apropiado para el ecosistema): CR ≥ 90%, EN ≥ 70%, VU ≥ 50%',
  C1: 'Extensión estimada en ≤ 100 km2 (CR) , ≤ 5.000 km2 (EN), ≤ 20.000 km2 (VU) con reducción persistente o severa observada, estimada, inferida o sospechada en distribución o en al menos un proceso ecológico fundamental, o una restricción del ecosistema a una localidad (CR), 5 o menos localidades (EN), o 10 o menos localidades (VU)',
  C2: 'Área de ocupación estimada en ≤ 10 km2 (CR), ≤ 500 km2 (EN), o ≤ 2.000 km2 (VU) con reducción persistente o severa observada, estimada, inferida o sospechada en distribución o en al menos un proceso ecológico fundamental; o una restricción del ecosistema a una localidad (CR), 5 o menos localidades (EN), o 10 o menos localidades (VU)',
  D: 'Distribución actual muy pequeña, con posibles amenazas serias, con o sin evidencia de reducciones pasadas (en distribución o en función ecológica), estimada en ≤ 5 km2 (CR), ≤ 50 km2 (EN), ≤ 100 km2 (VU)'
}
