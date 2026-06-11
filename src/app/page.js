'use client'
import { useState, useEffect } from 'react'

// ─────────────────────────────────────────────────
// BANCO DE IMÓVEIS — Em produção virá do Supabase
// Por enquanto, editado no admin e sincronizado aqui
// ─────────────────────────────────────────────────
const imoveisDB = [
  { id:1, titulo:'Apartamento 3 dorms com vista mar', tipo:'Apartamento', finalidade:'venda', bairro:'Canto do Forte', cidade:'Praia Grande', preco:680000, quartos:3, banheiros:2, vagas:2, area:88, andar:'8º', destaque:true, status:'publicado', cod:'PG-001', condo:780, iptu:1200, descricao:'Apartamento amplo e bem localizado no Canto do Forte, com vista privilegiada para o mar. Sala de estar e jantar integradas, cozinha planejada, área de serviço e varanda espaçosa. Todos os dormitórios com armários embutidos. Prédio com portaria 24h, salão de festas e academia.\n\nLocalização estratégica, a 5 minutos a pé da praia e próximo a mercados, escolas e transporte. Ideal para quem busca qualidade de vida em Praia Grande.', youtube:'', features:['Varanda gourmet','Piscina','Academia','Portaria 24h','Armários embutidos','Aceita financiamento','Pet friendly','Pronto para morar'], ph:'ph-1', emoji:'🏠' },
  { id:2, titulo:'Cobertura duplex frente ao mar', tipo:'Cobertura', finalidade:'venda', bairro:'Ocian', cidade:'Praia Grande', preco:1200000, quartos:4, banheiros:3, vagas:3, area:210, andar:'12º', destaque:true, status:'publicado', cod:'PG-002', condo:1200, iptu:3200, descricao:'Cobertura duplex exclusiva com terraço privativo e churrasqueira. Vista panorâmica para o mar em todos os ambientes. Condomínio com spa, sauna e estrutura de clube completo.', youtube:'', features:['Terraço privativo','Vista mar panorâmica','Churrasqueira','Spa e sauna','3 vagas cobertas','Condomínio clube'], ph:'ph-5', emoji:'🌊' },
  { id:3, titulo:'Apartamento 2 dorms reformado', tipo:'Apartamento', finalidade:'aluguel', bairro:'Tupi', cidade:'Praia Grande', preco:2800, quartos:2, banheiros:1, vagas:1, area:65, andar:'3º', destaque:false, status:'publicado', cod:'PG-003', condo:420, iptu:null, descricao:'Apartamento reformado em 2022, próximo à praia e ao comércio do Tupi. Armários embutidos em todos os quartos, portaria 24h.', youtube:'', features:['Reformado 2022','Armários embutidos','Portaria 24h','Próximo à praia'], ph:'ph-2', emoji:'🏢' },
  { id:4, titulo:'Casa 3 dorms com quintal', tipo:'Casa', finalidade:'aluguel', bairro:'Mirim', cidade:'Praia Grande', preco:3200, quartos:3, banheiros:2, vagas:2, area:120, andar:null, destaque:false, status:'publicado', cod:'PG-004', condo:null, iptu:null, descricao:'Casa espaçosa com quintal amplo, ideal para famílias. Duas vagas de garagem, pet friendly.', youtube:'', features:['Quintal amplo','2 vagas','Pet friendly'], ph:'ph-3', emoji:'🏡' },
  { id:5, titulo:'Terreno em área nobre', tipo:'Terreno', finalidade:'venda', bairro:'Guilhermina', cidade:'Praia Grande', preco:220000, quartos:null, banheiros:null, vagas:null, area:250, andar:null, destaque:false, status:'publicado', cod:'PG-005', condo:null, iptu:600, descricao:'Terreno plano em excelente localização, documentação em dia, próximo ao comércio e transporte público.', youtube:'', features:['Documentação ok','Topografia plana','Próximo ao comércio'], ph:'ph-4', emoji:'🏗️' },
  { id:6, titulo:'Studio moderno mobiliado', tipo:'Studio', finalidade:'aluguel', bairro:'Aviação', cidade:'Praia Grande', preco:1800, quartos:1, banheiros:1, vagas:1, area:42, andar:'3º', destaque:false, status:'publicado', cod:'PG-006', condo:320, iptu:null, descricao:'Studio totalmente mobiliado e decorado. Wi-Fi incluso, portaria 24h. Ideal para solteiros ou casais.', youtube:'', features:['Mobiliado','Cozinha americana','Wi-Fi incluso','Portaria 24h'], ph:'ph-6', emoji:'🏠' },
]

const phColors = {
  'ph-1':'linear-gradient(135deg,#b8cce8,#6090c8)',
  'ph-2':'linear-gradient(135deg,#b8c8e8,#7090c8)',
  'ph-3':'linear-gradient(135deg,#c8d4e8,#8898c8)',
  'ph-4':'linear-gradient(135deg,#d4d8e8,#9098c0)',
  'ph-5':'linear-gradient(135deg,#90b8e0,#4070b8)',
  'ph-6':'linear-gradient(135deg,#c0cce0,#8090b8)',
}

const formatPreco = (preco, finalidade) => {
  if (finalidade === 'aluguel') return `R$ ${Number(preco).toLocaleString('pt-BR')}/mês`
  const n = Number(preco)
  if (n >= 1000000) return `R$ ${(n/1000000).toFixed(n%1000000===0?0:1).replace('.',',')} mi`
  return `R$ ${n.toLocaleString('pt-BR')}`
}

const bairrosPG = ['Aviação','Canto do Forte','Guilhermina','Mirim','Ocian','Solemar','Tupi','Vila Sônia']

export default function Portal() {
  const [tela, setTela] = useState('home')
  const [imovelAtivo, setImovelAtivo] = useState(null)
  const [filtros, setFiltros] = useState({ finalidade:'todos', tipo:'todos', quartos:'todos', bairro:'todos' })
  const [busca, setBusca] = useState('')
  const [menuAberto, setMenuAberto] = useState(false)
  const [filtrosMobileAberto, setFiltrosMobileAberto] = useState(false)
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const imoveisPublicados = imoveisDB.filter(i => i.status === 'publicado')
  const imoveisFiltrados = imoveisPublicados.filter(i => {
    if (filtros.finalidade !== 'todos' && i.finalidade !== filtros.finalidade) return false
    if (filtros.tipo !== 'todos' && i.tipo !== filtros.tipo) return false
    if (filtros.quartos !== 'todos') {
      if (filtros.quartos === '4+' && i.quartos < 4) return false
      else if (filtros.quartos !== '4+' && i.quartos !== parseInt(filtros.quartos)) return false
    }
    if (filtros.bairro !== 'todos' && i.bairro !== filtros.bairro) return false
    if (busca && !i.titulo.toLowerCase().includes(busca.toLowerCase()) && !i.bairro.toLowerCase().includes(busca.toLowerCase())) return false
    return true
  })

  const abrirImovel = (im) => { setImovelAtivo(im); setTela('imovel'); window.scrollTo(0,0); setMenuAberto(false) }
  const goTo = (t) => { setTela(t); window.scrollTo(0,0); setMenuAberto(false) }

  // ── NAV ──────────────────────────────────────────
  const Nav = () => (
    <nav style={{ background:'#021356', height: mobile ? '60px' : '66px', display:'flex', alignItems:'center', justifyContent:'space-between', padding: mobile ? '0 16px' : '0 32px', position:'sticky', top:0, zIndex:100, borderBottom:'3px solid #FADB24' }}>
      <div onClick={() => goTo('home')} style={{ fontFamily:'Montserrat,sans-serif', fontSize: mobile ? '15px' : '18px', fontWeight:800, color:'#fff', display:'flex', alignItems:'center', gap:'8px', cursor:'pointer', textTransform:'uppercase' }}>
        <div style={{ width:'8px', height:'8px', background:'#FADB24', borderRadius:'50%', flexShrink:0 }}></div>
        {mobile ? 'Lar dos Sonhos' : 'Lar dos Sonhos '}
        <span style={{ color:'#FADB24' }}>{mobile ? '' : ' Imóveis'}</span>
      </div>

      {mobile ? (
        <button onClick={() => setMenuAberto(!menuAberto)} style={{ background:'none', border:'none', cursor:'pointer', padding:'8px', display:'flex', flexDirection:'column', gap:'5px' }}>
          {[0,1,2].map(i => <div key={i} style={{ width:'22px', height:'2px', background: menuAberto ? '#FADB24' : 'rgba(255,255,255,0.8)', borderRadius:'2px', transition:'all 0.2s', transform: menuAberto && i===0 ? 'rotate(45deg) translate(5px,5px)' : menuAberto && i===1 ? 'scaleX(0)' : menuAberto && i===2 ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }}></div>}
        </button>
      ) : (
        <div style={{ display:'flex', gap:'28px', alignItems:'center' }}>
          {[['Comprar','venda'],['Alugar','aluguel']].map(([l,v]) => (
            <span key={v} onClick={() => { setFiltros({...filtros, finalidade:v}); goTo('listing') }} style={{ color:'rgba(255,255,255,0.72)', fontSize:'13px', fontWeight:500, cursor:'pointer' }}>{l}</span>
          ))}
          <span onClick={() => goTo('listing')} style={{ color:'rgba(255,255,255,0.72)', fontSize:'13px', fontWeight:500, cursor:'pointer' }}>Imóveis</span>
          <button onClick={() => goTo('listing')} style={{ background:'#FADB24', color:'#021356', border:'none', borderRadius:'8px', padding:'9px 20px', fontFamily:'Montserrat,sans-serif', fontSize:'12px', fontWeight:700, cursor:'pointer', textTransform:'uppercase', letterSpacing:'0.4px' }}>Ver imóveis</button>
        </div>
      )}

      {/* Menu mobile dropdown */}
      {mobile && menuAberto && (
        <div style={{ position:'absolute', top:'60px', left:0, right:0, background:'#021356', borderBottom:'3px solid #FADB24', padding:'8px 0', zIndex:99 }}>
          {[['🏠 Comprar','venda'],['🔑 Alugar','aluguel'],['📋 Todos os imóveis','todos']].map(([l,v]) => (
            <div key={v} onClick={() => { setFiltros({...filtros, finalidade: v}); goTo('listing') }} style={{ padding:'14px 20px', color:'rgba(255,255,255,0.85)', fontSize:'14px', fontWeight:600, cursor:'pointer', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>{l}</div>
          ))}
          <div style={{ padding:'12px 16px' }}>
            <button onClick={() => goTo('listing')} style={{ width:'100%', background:'#FADB24', color:'#021356', border:'none', borderRadius:'8px', padding:'12px', fontFamily:'Montserrat,sans-serif', fontSize:'13px', fontWeight:700, cursor:'pointer', textTransform:'uppercase' }}>Ver todos os imóveis</button>
          </div>
        </div>
      )}
    </nav>
  )

  const Footer = () => (
    <footer style={{ background:'#021356', borderTop:'3px solid #FADB24', padding: mobile ? '20px 16px' : '24px 40px', display:'flex', flexDirection: mobile ? 'column' : 'row', alignItems: mobile ? 'flex-start' : 'center', justifyContent:'space-between', gap: mobile ? '12px' : '0' }}>
      <div style={{ fontFamily:'Montserrat,sans-serif', fontSize:'14px', fontWeight:800, color:'#fff', display:'flex', alignItems:'center', gap:'8px', textTransform:'uppercase' }}>
        <div style={{ width:'7px', height:'7px', background:'#FADB24', borderRadius:'50%' }}></div>
        Lar dos Sonhos <span style={{ color:'#FADB24' }}>&nbsp;Imóveis</span>
      </div>
      <p style={{ fontSize:'11px', color:'rgba(255,255,255,0.40)', fontWeight:500 }}>CRECI-SP 302244-F · Praia Grande - SP · © 2026</p>
      <div style={{ display:'flex', gap:'8px' }}>
        {['📘','📷','▶'].map((ic,i) => <div key={i} style={{ width:'32px', height:'32px', background:'rgba(250,219,36,0.12)', borderRadius:'8px', border:'1px solid rgba(250,219,36,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px', cursor:'pointer' }}>{ic}</div>)}
      </div>
    </footer>
  )

  const CardImovel = ({ im, onClick }) => (
    <div onClick={onClick}
      style={{ background:'#fff', borderRadius:'16px', overflow:'hidden', cursor:'pointer', border:'1px solid rgba(2,19,86,0.10)', boxShadow:'0 2px 12px rgba(0,0,0,0.07)', transition:'transform 0.2s, box-shadow 0.2s' }}
      onMouseEnter={e => { if(!mobile){e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 12px 40px rgba(2,19,86,0.14)'} }}
      onMouseLeave={e => { e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='0 2px 12px rgba(0,0,0,0.07)' }}>
      <div style={{ position:'relative' }}>
        <div style={{ width:'100%', height: mobile ? '180px' : '200px', background:phColors[im.ph], display:'flex', alignItems:'center', justifyContent:'center', fontSize:'48px' }}>{im.emoji}</div>
        <div style={{ position:'absolute', top:'10px', left:'10px', background: im.destaque ? '#FADB24' : im.finalidade==='aluguel' ? '#1a3fbb' : '#021356', color: im.destaque ? '#021356' : '#fff', fontSize:'10px', fontWeight:700, padding:'4px 9px', borderRadius:'6px', textTransform:'uppercase', letterSpacing:'0.8px' }}>
          {im.destaque ? '✦ Destaque' : im.finalidade==='aluguel' ? 'Aluguel' : 'Venda'}
        </div>
      </div>
      <div style={{ padding:'14px 16px 16px' }}>
        <div style={{ fontSize: mobile ? '18px' : '20px', fontWeight:800, color:'#021356', marginBottom:'3px', letterSpacing:'-0.5px' }}>{formatPreco(im.preco, im.finalidade)}</div>
        <div style={{ fontSize:'12px', color:'#4a5070', fontWeight:500, marginBottom:'12px', lineHeight:1.4 }}>{im.tipo} · {im.bairro}, {im.cidade}</div>
        <div style={{ display:'flex', gap:'12px', paddingTop:'10px', borderTop:'1px solid rgba(2,19,86,0.08)' }}>
          <span style={{ fontSize:'11px', color:'#4a5070', fontWeight:600 }}>📐 {im.area}m²</span>
          {im.quartos && <span style={{ fontSize:'11px', color:'#4a5070', fontWeight:600 }}>🛏 {im.quartos} qtos</span>}
          {im.vagas && <span style={{ fontSize:'11px', color:'#4a5070', fontWeight:600 }}>🚗 {im.vagas} vg</span>}
        </div>
      </div>
    </div>
  )

  // ── HOME ──────────────────────────────────────────
  if (tela === 'home') return (
    <>
      <Nav />
      {/* Hero */}
      <section style={{ background:'#021356', backgroundImage:'url(/hero-praia-grande.jpg)', backgroundSize:'cover', backgroundPosition:'center', minHeight: mobile ? '100svh' : '580px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding: mobile ? '60px 16px 40px' : '80px 32px 60px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'rgba(2,19,86,0.75)' }}></div>
        <div style={{ position:'relative', zIndex:1, display:'flex', flexDirection:'column', alignItems:'center', width:'100%', maxWidth:'860px' }}>
          <div style={{ background:'rgba(250,219,36,0.15)', color:'#FADB24', fontSize:'11px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', padding:'7px 18px', borderRadius:'20px', marginBottom: mobile ? '20px' : '28px', border:'1px solid rgba(250,219,36,0.25)' }}>
            ✦ Imóveis selecionados · Praia Grande - SP
          </div>
          <h1 style={{ fontFamily:'Montserrat,sans-serif', fontSize: mobile ? '32px' : '50px', fontWeight:800, color:'#fff', textAlign:'center', lineHeight:1.12, marginBottom:'16px', letterSpacing:'-1px' }}>
            Encontre o imóvel <span style={{ color:'#FADB24' }}>certo</span><br/>para o seu momento
          </h1>
          <p style={{ color:'rgba(255,255,255,0.60)', fontSize: mobile ? '14px' : '16px', textAlign:'center', maxWidth:'480px', lineHeight:1.7, marginBottom: mobile ? '32px' : '44px', fontWeight:400 }}>
            Imóveis selecionados e atendimento exclusivo e personalizado em Praia Grande. Do Canto do Forte ao Solemar, cuido de cada detalhe pra você.
          </p>

          {/* Barra de busca — adaptada para mobile */}
          {mobile ? (
            <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:'10px' }}>
              <input placeholder="🔍 Bairro ou tipo de imóvel..." value={busca} onChange={e => setBusca(e.target.value)}
                style={{ width:'100%', padding:'14px 16px', border:'2px solid rgba(250,219,36,0.3)', borderRadius:'12px', fontFamily:'Montserrat,sans-serif', fontSize:'14px', outline:'none', background:'rgba(255,255,255,0.97)', color:'#0a0f2e', fontWeight:500 }} />
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
                <select onChange={e => setFiltros({...filtros, finalidade: e.target.value})} style={{ padding:'13px 12px', border:'none', borderRadius:'12px', fontFamily:'Montserrat,sans-serif', fontSize:'13px', background:'rgba(255,255,255,0.95)', color:'#0a0f2e', fontWeight:600, outline:'none' }}>
                  <option value="todos">Comprar ou Alugar</option>
                  <option value="venda">Comprar</option>
                  <option value="aluguel">Alugar</option>
                </select>
                <select onChange={e => setFiltros({...filtros, tipo: e.target.value === 'Tipo' ? 'todos' : e.target.value})} style={{ padding:'13px 12px', border:'none', borderRadius:'12px', fontFamily:'Montserrat,sans-serif', fontSize:'13px', background:'rgba(255,255,255,0.95)', color:'#0a0f2e', fontWeight:600, outline:'none' }}>
                  <option value="Tipo">Tipo de imóvel</option>
                  <option>Apartamento</option><option>Casa</option><option>Cobertura</option><option>Studio</option><option>Terreno</option>
                </select>
              </div>
              <button onClick={() => goTo('listing')} style={{ width:'100%', padding:'15px', background:'#FADB24', color:'#021356', border:'none', borderRadius:'12px', fontFamily:'Montserrat,sans-serif', fontSize:'14px', fontWeight:700, cursor:'pointer', textTransform:'uppercase', letterSpacing:'0.5px' }}>
                🔍 Buscar imóveis
              </button>
            </div>
          ) : (
            <div style={{ background:'#fff', borderRadius:'16px', padding:'8px', display:'flex', alignItems:'center', width:'100%', maxWidth:'840px', boxShadow:'0 8px 48px rgba(0,0,0,0.24)', border:'2px solid rgba(250,219,36,0.3)' }}>
              <input placeholder="Bairro, cidade ou código do imóvel..." value={busca} onChange={e => setBusca(e.target.value)} style={{ flex:1, padding:'13px 16px', border:'none', background:'transparent', fontFamily:'Montserrat,sans-serif', fontSize:'13px', color:'#0a0f2e', outline:'none', fontWeight:500 }} />
              <div style={{ width:'1px', height:'36px', background:'rgba(2,19,86,0.10)' }}></div>
              <select onChange={e => setFiltros({...filtros, finalidade: e.target.value==='Comprar' ? 'venda' : e.target.value==='Alugar' ? 'aluguel' : 'todos'})} style={{ flex:1, minWidth:'120px', padding:'13px 16px', border:'none', background:'transparent', fontFamily:'Montserrat,sans-serif', fontSize:'13px', color:'#0a0f2e', outline:'none', fontWeight:500 }}>
                <option>Comprar</option><option>Alugar</option>
              </select>
              <div style={{ width:'1px', height:'36px', background:'rgba(2,19,86,0.10)' }}></div>
              <select onChange={e => setFiltros({...filtros, tipo: e.target.value==='Tipo de imóvel' ? 'todos' : e.target.value})} style={{ flex:1, minWidth:'130px', padding:'13px 16px', border:'none', background:'transparent', fontFamily:'Montserrat,sans-serif', fontSize:'13px', color:'#0a0f2e', outline:'none', fontWeight:500 }}>
                <option>Tipo de imóvel</option><option>Apartamento</option><option>Casa</option><option>Cobertura</option><option>Studio</option><option>Terreno</option>
              </select>
              <div style={{ width:'1px', height:'36px', background:'rgba(2,19,86,0.10)' }}></div>
              <select onChange={e => setFiltros({...filtros, quartos: e.target.value==='Quartos' ? 'todos' : e.target.value.split(' ')[0]})} style={{ flex:1, minWidth:'100px', padding:'13px 16px', border:'none', background:'transparent', fontFamily:'Montserrat,sans-serif', fontSize:'13px', color:'#0a0f2e', outline:'none', fontWeight:500 }}>
                <option>Quartos</option><option>1 quarto</option><option>2 quartos</option><option>3 quartos</option><option>4+</option>
              </select>
              <button onClick={() => goTo('listing')} style={{ background:'#FADB24', color:'#021356', border:'none', borderRadius:'12px', padding:'14px 28px', fontFamily:'Montserrat,sans-serif', fontSize:'13px', fontWeight:700, cursor:'pointer', textTransform:'uppercase', letterSpacing:'0.5px', whiteSpace:'nowrap', display:'flex', alignItems:'center', gap:'6px' }}>
                🔍 Buscar
              </button>
            </div>
          )}

          {/* Stats */}
          <div style={{ display:'flex', gap: mobile ? '28px' : '56px', marginTop: mobile ? '36px' : '44px' }}>
            {[['47','Imóveis'],['8 anos','Experiência'],['200+','Famílias']].map(([n,l],i) => (
              <div key={i} style={{ textAlign:'center' }}>
                <span style={{ fontFamily:'Montserrat,sans-serif', fontSize: mobile ? '26px' : '34px', fontWeight:800, color:'#FADB24', display:'block', letterSpacing:'-1px' }}>{n}</span>
                <span style={{ fontSize: mobile ? '10px' : '11px', color:'rgba(255,255,255,0.50)', letterSpacing:'0.5px', fontWeight:500, textTransform:'uppercase' }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pills rápidas */}
      <div style={{ display:'flex', gap:'8px', padding: mobile ? '16px 16px 0' : '24px 32px 0', overflowX:'auto', scrollbarWidth:'none' }}>
        {[['Todos','todos'],['Apartamentos','Apartamento'],['Casas','Casa'],['Coberturas','Cobertura'],['Terrenos','Terreno'],['✦ Destaques','destaque']].map(([l,v]) => (
          <button key={v} onClick={() => { if(v==='destaque'){setFiltros({finalidade:'todos',tipo:'todos',quartos:'todos',bairro:'todos'}); setBusca('')}else{setFiltros({finalidade:'todos',tipo:v==='todos'?'todos':v,quartos:'todos',bairro:'todos'})}; goTo('listing') }}
            style={{ background:'#fff', border:'1.5px solid rgba(2,19,86,0.10)', borderRadius:'20px', padding:'8px 16px', fontSize:'12px', fontWeight:600, color:'#4a5070', cursor:'pointer', whiteSpace:'nowrap', textTransform:'uppercase', letterSpacing:'0.3px', fontFamily:'Montserrat,sans-serif' }}>
            {l}
          </button>
        ))}
      </div>

      {/* Grid de imóveis */}
      <section style={{ padding: mobile ? '20px 16px 40px' : '40px 32px 52px' }}>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'20px', flexWrap:'wrap', gap:'8px' }}>
          <div>
            <div style={{ fontSize:'10px', fontWeight:700, color:'#d4b800', textTransform:'uppercase', letterSpacing:'1.5px', marginBottom:'6px' }}>em destaque</div>
            <h2 style={{ fontFamily:'Montserrat,sans-serif', fontSize: mobile ? '22px' : '28px', fontWeight:800, color:'#0a0f2e', letterSpacing:'-0.5px' }}>Imóveis selecionados</h2>
          </div>
          <button onClick={() => goTo('listing')} style={{ fontSize:'12px', color:'#1a3fbb', fontWeight:700, background:'none', border:'none', cursor:'pointer', textTransform:'uppercase', letterSpacing:'0.5px', fontFamily:'Montserrat,sans-serif', display:'flex', alignItems:'center', gap:'4px' }}>
            Ver todos →
          </button>
        </div>
        <div style={{ display:'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(auto-fill,minmax(280px,1fr))', gap: mobile ? '14px' : '20px' }}>
          {imoveisPublicados.slice(0,6).map(im => <CardImovel key={im.id} im={im} onClick={() => abrirImovel(im)} />)}
        </div>
      </section>

      {/* CTA strip mobile */}
      {mobile && (
        <div style={{ background:'#021356', padding:'24px 16px', textAlign:'center', borderTop:'3px solid #FADB24', marginBottom:'0' }}>
          <p style={{ color:'rgba(255,255,255,0.7)', fontSize:'13px', fontWeight:500, marginBottom:'12px' }}>Não encontrou o que procura?</p>
          <a href="https://wa.me/5513999990000" target="_blank" rel="noopener noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'#25d366', color:'#fff', padding:'13px 28px', borderRadius:'12px', fontFamily:'Montserrat,sans-serif', fontSize:'13px', fontWeight:700, textDecoration:'none', textTransform:'uppercase', letterSpacing:'0.4px' }}>
            💬 Falar com o Gabriel
          </a>
        </div>
      )}

      <Footer />
    </>
  )

  // ── LISTAGEM ──────────────────────────────────────
  if (tela === 'listing') return (
    <>
      <Nav />
      <div style={{ display:'flex', minHeight:`calc(100vh - ${mobile?'60px':'66px'})`, position:'relative' }}>

        {/* Sidebar desktop */}
        {!mobile && (
          <aside style={{ width:'280px', background:'#fff', borderRight:'1px solid rgba(2,19,86,0.10)', padding:'24px 20px', position:'sticky', top:'66px', height:'calc(100vh - 66px)', overflowY:'auto', flexShrink:0 }}>
            <h3 style={{ fontSize:'14px', fontWeight:800, marginBottom:'20px', color:'#021356', textTransform:'uppercase', letterSpacing:'0.5px' }}>Filtrar imóveis</h3>
            {[
              { label:'Finalidade', key:'finalidade', opts:[{v:'todos',l:'Todos'},{v:'venda',l:'Comprar'},{v:'aluguel',l:'Alugar'}] },
              { label:'Quartos', key:'quartos', opts:[{v:'todos',l:'Todos'},{v:'1',l:'1'},{v:'2',l:'2'},{v:'3',l:'3'},{v:'4+',l:'4+'}] },
              { label:'Bairro', key:'bairro', opts:[{v:'todos',l:'Todos'},...bairrosPG.map(b=>({v:b,l:b}))] },
            ].map(fg => (
              <div key={fg.key} style={{ marginBottom:'22px' }}>
                <span style={{ fontSize:'10px', fontWeight:700, color:'#8a91b0', textTransform:'uppercase', letterSpacing:'1.2px', marginBottom:'10px', display:'block' }}>{fg.label}</span>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
                  {fg.opts.map(o => (
                    <button key={o.v} onClick={() => setFiltros({...filtros,[fg.key]:o.v})}
                      style={{ padding:'6px 12px', border:`1.5px solid ${filtros[fg.key]===o.v ? '#021356' : 'rgba(2,19,86,0.10)'}`, borderRadius:'8px', fontSize:'12px', color:filtros[fg.key]===o.v ? '#fff' : '#4a5070', background:filtros[fg.key]===o.v ? '#021356' : 'transparent', cursor:'pointer', fontFamily:'Montserrat,sans-serif', fontWeight:600 }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={() => setFiltros({finalidade:'todos',tipo:'todos',quartos:'todos',bairro:'todos'})} style={{ width:'100%', padding:'10px', background:'transparent', color:'#8a91b0', border:'none', fontFamily:'Montserrat,sans-serif', fontSize:'12px', fontWeight:500, cursor:'pointer', marginTop:'4px' }}>Limpar filtros</button>
          </aside>
        )}

        {/* Main */}
        <main style={{ flex:1, background:'#f0f2f8', minWidth:0 }}>
          {/* Topbar */}
          <div style={{ background:'#fff', borderBottom:'1px solid rgba(2,19,86,0.10)', padding: mobile ? '12px 16px' : '14px 24px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'10px', flexWrap:'wrap', position:'sticky', top: mobile ? '60px' : '66px', zIndex:30 }}>
            <span style={{ fontSize:'13px', color:'#4a5070', fontWeight:500 }}>
              <strong style={{ color:'#021356', fontWeight:800 }}>{imoveisFiltrados.length}</strong> imóveis encontrados
            </span>
            {mobile && (
              <button onClick={() => setFiltrosMobileAberto(true)} style={{ display:'flex', alignItems:'center', gap:'6px', padding:'8px 14px', background:'#021356', color:'#fff', border:'none', borderRadius:'8px', fontFamily:'Montserrat,sans-serif', fontSize:'12px', fontWeight:700, cursor:'pointer', textTransform:'uppercase' }}>
                ⚙️ Filtros
              </button>
            )}
          </div>

          <div style={{ padding: mobile ? '14px 12px 32px' : '20px 22px', display:'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(auto-fill,minmax(255px,1fr))', gap: mobile ? '12px' : '16px' }}>
            {imoveisFiltrados.length > 0
              ? imoveisFiltrados.map(im => <CardImovel key={im.id} im={im} onClick={() => abrirImovel(im)} />)
              : <div style={{ gridColumn:'1/-1', textAlign:'center', padding:'64px 20px' }}>
                  <div style={{ fontSize:'48px', marginBottom:'12px' }}>🔍</div>
                  <p style={{ fontSize:'15px', fontWeight:700, color:'#4a5070' }}>Nenhum imóvel encontrado</p>
                  <p style={{ fontSize:'13px', color:'#8a91b0', marginTop:'6px' }}>Tente ajustar os filtros</p>
                  <button onClick={() => setFiltros({finalidade:'todos',tipo:'todos',quartos:'todos',bairro:'todos'})} style={{ marginTop:'16px', padding:'10px 22px', background:'#021356', color:'#fff', border:'none', borderRadius:'8px', fontFamily:'Montserrat,sans-serif', fontSize:'12px', fontWeight:700, cursor:'pointer', textTransform:'uppercase' }}>Ver todos</button>
                </div>
            }
          </div>
        </main>
      </div>

      {/* Modal filtros mobile */}
      {mobile && filtrosMobileAberto && (
        <div style={{ position:'fixed', inset:0, background:'rgba(2,19,86,0.5)', zIndex:200, display:'flex', flexDirection:'column', justifyContent:'flex-end' }} onClick={() => setFiltrosMobileAberto(false)}>
          <div style={{ background:'#fff', borderRadius:'20px 20px 0 0', padding:'24px 20px 40px', maxHeight:'85vh', overflowY:'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'20px' }}>
              <h3 style={{ fontSize:'16px', fontWeight:800, color:'#021356' }}>Filtrar imóveis</h3>
              <button onClick={() => setFiltrosMobileAberto(false)} style={{ background:'none', border:'none', fontSize:'22px', cursor:'pointer', color:'#8a91b0' }}>×</button>
            </div>
            {[
              { label:'Finalidade', key:'finalidade', opts:[{v:'todos',l:'Todos'},{v:'venda',l:'Comprar'},{v:'aluguel',l:'Alugar'}] },
              { label:'Quartos', key:'quartos', opts:[{v:'todos',l:'Todos'},{v:'1',l:'1'},{v:'2',l:'2'},{v:'3',l:'3'},{v:'4+',l:'4+'}] },
              { label:'Bairro', key:'bairro', opts:[{v:'todos',l:'Todos'},...bairrosPG.map(b=>({v:b,l:b}))] },
            ].map(fg => (
              <div key={fg.key} style={{ marginBottom:'20px' }}>
                <span style={{ fontSize:'10px', fontWeight:700, color:'#8a91b0', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'10px', display:'block' }}>{fg.label}</span>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                  {fg.opts.map(o => (
                    <button key={o.v} onClick={() => setFiltros({...filtros,[fg.key]:o.v})}
                      style={{ padding:'9px 16px', border:`1.5px solid ${filtros[fg.key]===o.v ? '#021356' : 'rgba(2,19,86,0.10)'}`, borderRadius:'8px', fontSize:'13px', color:filtros[fg.key]===o.v ? '#fff' : '#4a5070', background:filtros[fg.key]===o.v ? '#021356' : 'transparent', cursor:'pointer', fontFamily:'Montserrat,sans-serif', fontWeight:600 }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={() => setFiltrosMobileAberto(false)} style={{ width:'100%', padding:'14px', background:'#021356', color:'#fff', border:'none', borderRadius:'10px', fontFamily:'Montserrat,sans-serif', fontSize:'13px', fontWeight:700, cursor:'pointer', textTransform:'uppercase', borderBottom:'3px solid #FADB24', marginTop:'8px' }}>
              Ver {imoveisFiltrados.length} imóveis
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  )

  // ── LANDING PAGE IMÓVEL ───────────────────────────
  if (tela === 'imovel' && imovelAtivo) {
    const im = imovelAtivo
    return (
      <>
        {/* Header limpo */}
        <div style={{ background:'#021356', padding: mobile ? '12px 16px' : '16px 40px', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'3px solid #FADB24', position:'sticky', top:0, zIndex:100 }}>
          <button onClick={voltarListagem} style={{ display:'flex', alignItems:'center', gap:'6px', color:'rgba(255,255,255,0.7)', fontSize:'12px', fontWeight:600, cursor:'pointer', background:'none', border:'none', fontFamily:'Montserrat,sans-serif', textTransform:'uppercase' }}>
            ← {mobile ? 'Voltar' : 'Voltar à busca'}
          </button>
          <div style={{ fontFamily:'Montserrat,sans-serif', fontSize: mobile ? '13px' : '15px', fontWeight:800, color:'#fff', display:'flex', alignItems:'center', gap:'8px', cursor:'pointer', textTransform:'uppercase' }} onClick={() => goTo('home')}>
            <div style={{ width:'7px', height:'7px', background:'#FADB24', borderRadius:'50%' }}></div>
            {mobile ? 'Lar dos Sonhos' : 'Lar dos Sonhos Imóveis'}
          </div>
          <div style={{ display:'flex', gap:'8px' }}>
            {!mobile && ['📤 Compartilhar','♡ Favoritar'].map((t,i) => (
              <button key={i} style={{ background:'rgba(255,255,255,0.10)', border:'1px solid rgba(255,255,255,0.18)', borderRadius:'8px', color:'#fff', padding:'7px 14px', fontSize:'11px', fontFamily:'Montserrat,sans-serif', fontWeight:600, cursor:'pointer', textTransform:'uppercase' }}>{t}</button>
            ))}
            {mobile && <button style={{ background:'rgba(255,255,255,0.10)', border:'1px solid rgba(255,255,255,0.18)', borderRadius:'8px', color:'#fff', padding:'7px 12px', fontSize:'16px', cursor:'pointer' }}>📤</button>}
          </div>
        </div>

        {/* Galeria */}
        <div style={{ display:'grid', gridTemplateColumns: mobile ? '1fr' : '2fr 1fr 1fr', gridTemplateRows: mobile ? 'auto' : '260px 180px', gap:'3px', background:'#000' }}>
          <div style={{ gridRow: mobile ? 'auto' : '1/3', background:phColors[im.ph], height: mobile ? '260px' : 'auto', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'80px' }}>{im.emoji}</div>
          {!mobile && ['ph-2','ph-3','ph-4','ph-5'].map((ph,i) => (
            <div key={i} style={{ background:phColors[ph], position:'relative', display:'flex', alignItems:'center', justifyContent:'center' }}>
              {i===3 && <div style={{ position:'absolute', inset:0, background:'rgba(2,19,86,0.58)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:'12px', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.5px', cursor:'pointer' }}>📷 +12 fotos</div>}
            </div>
          ))}
        </div>

        {/* Conteúdo */}
        <div style={{ maxWidth: mobile ? '100%' : '1180px', margin:'0 auto', padding: mobile ? '0 0 80px' : '0 40px 80px' }}>
          <div style={{ display: mobile ? 'flex' : 'grid', flexDirection: mobile ? 'column' : undefined, gridTemplateColumns: mobile ? undefined : '1fr 370px', gap: mobile ? '0' : '48px', alignItems:'start' }}>

            {/* Esquerda */}
            <div style={{ padding: mobile ? '0 16px' : '0' }}>
              <div style={{ fontSize:'11px', fontWeight:700, color:'#1a3fbb', textTransform:'uppercase', letterSpacing:'1.5px', margin: mobile ? '20px 0 8px' : '32px 0 10px', display:'flex', alignItems:'center', gap:'6px' }}>
                📍 {im.bairro} · {im.cidade}, SP
              </div>
              <h1 style={{ fontFamily:'Montserrat,sans-serif', fontSize: mobile ? '22px' : '32px', fontWeight:800, color:'#021356', lineHeight:1.15, marginBottom:'10px', letterSpacing:'-0.5px' }}>{im.titulo}</h1>
              <p style={{ fontSize:'12px', color:'#4a5070', marginBottom:'20px', fontWeight:500 }}>📍 {im.bairro}, {im.cidade}-SP · Cód. {im.cod}</p>

              {/* Atributos */}
              <div style={{ display:'flex', background:'#f0f2f8', borderRadius:'12px', overflow:'hidden', marginBottom:'28px', border:'1px solid rgba(2,19,86,0.10)' }}>
                {[
                  {icon:'📐',val:im.area,label:'m²'},
                  ...(im.quartos?[{icon:'🛏️',val:im.quartos,label:'dorms'}]:[]),
                  ...(im.banheiros?[{icon:'🚿',val:im.banheiros,label:'banhs'}]:[]),
                  ...(im.vagas?[{icon:'🚗',val:im.vagas,label:'vagas'}]:[]),
                  ...(im.andar?[{icon:'🏢',val:im.andar,label:'andar'}]:[]),
                ].map((a,i,arr) => (
                  <div key={i} style={{ flex:1, padding: mobile ? '14px 8px' : '20px 14px', textAlign:'center', borderRight:i<arr.length-1?'1px solid rgba(2,19,86,0.08)':'none' }}>
                    <span style={{ fontSize: mobile ? '16px' : '20px', display:'block', marginBottom:'4px' }}>{a.icon}</span>
                    <span style={{ fontFamily:'Montserrat,sans-serif', fontSize: mobile ? '18px' : '22px', fontWeight:800, color:'#021356', display:'block', marginBottom:'2px', letterSpacing:'-0.5px' }}>{a.val}</span>
                    <span style={{ fontSize:'10px', color:'#8a91b0', textTransform:'uppercase', letterSpacing:'0.5px', fontWeight:600 }}>{a.label}</span>
                  </div>
                ))}
              </div>

              {/* Descrição */}
              <div style={{ fontSize:'14px', fontWeight:800, color:'#021356', marginBottom:'12px', paddingBottom:'10px', borderBottom:'2px solid #FADB24', textTransform:'uppercase', letterSpacing:'0.3px' }}>Sobre este imóvel</div>
              <p style={{ fontSize: mobile ? '13px' : '14px', color:'#4a5070', lineHeight:1.85, marginBottom:'28px', fontWeight:400 }}>
                {im.descricao || `${im.tipo} em excelente localização no ${im.bairro}, ${im.cidade}. Imóvel com ${im.area}m²${im.quartos?`, ${im.quartos} dormitórios`:''}${im.banheiros?`, ${im.banheiros} banheiro(s)`:''}${im.vagas?` e ${im.vagas} vaga(s)`:''}. Documentação em dia e pronto para negociação.`}
              </p>

              {/* Features */}
              {im.features?.length > 0 && (
                <>
                  <div style={{ fontSize:'14px', fontWeight:800, color:'#021356', marginBottom:'12px', paddingBottom:'10px', borderBottom:'2px solid #FADB24', textTransform:'uppercase', letterSpacing:'0.3px' }}>Diferenciais</div>
                  <div style={{ display:'grid', gridTemplateColumns: mobile ? '1fr 1fr' : '1fr 1fr', gap:'10px', marginBottom:'28px' }}>
                    {im.features.map((f,i) => (
                      <div key={i} style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'13px', color:'#4a5070', fontWeight:600 }}>
                        <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#FADB24', flexShrink:0, border:'2px solid #021356' }}></div>{f}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Valores */}
              <div style={{ fontSize:'14px', fontWeight:800, color:'#021356', marginBottom:'12px', paddingBottom:'10px', borderBottom:'2px solid #FADB24', textTransform:'uppercase', letterSpacing:'0.3px' }}>Valores</div>
              <div style={{ background:'#f0f2f8', borderRadius:'12px', padding:'18px 20px', marginBottom:'28px', border:'1px solid rgba(2,19,86,0.08)' }}>
                {[
                  {l:`Valor de ${im.finalidade==='aluguel'?'aluguel':'venda'}`, v:formatPreco(im.preco,im.finalidade), bold:true},
                  ...(im.condo?[{l:'Condomínio',v:`R$ ${Number(im.condo).toLocaleString('pt-BR')}/mês`}]:[]),
                  ...(im.iptu?[{l:'IPTU',v:`R$ ${Number(im.iptu).toLocaleString('pt-BR')}/ano`}]:[]),
                ].map((row,i,arr) => (
                  <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'9px 0', borderBottom:i<arr.length-1?'1px solid rgba(2,19,86,0.07)':'none', fontSize:'13px' }}>
                    <span style={{ color:'#4a5070', fontWeight:500 }}>{row.l}</span>
                    <span style={{ fontWeight:row.bold?800:600, color:row.bold?'#021356':'#0a0f2e', fontSize:row.bold?'16px':'13px', letterSpacing:row.bold?'-0.5px':0 }}>{row.v}</span>
                  </div>
                ))}
              </div>

              {/* Mapa */}
              <div style={{ fontSize:'14px', fontWeight:800, color:'#021356', marginBottom:'12px', paddingBottom:'10px', borderBottom:'2px solid #FADB24', textTransform:'uppercase', letterSpacing:'0.3px' }}>Localização</div>
              <div style={{ background:'linear-gradient(135deg,#b8c8e0,#8ab0d8)', borderRadius:'12px', height:'200px', display:'flex', alignItems:'center', justifyContent:'center', marginBottom: mobile ? '0' : '36px', position:'relative', border:'1px solid rgba(2,19,86,0.10)' }}>
                <div style={{ width:'32px', height:'32px', background:'#021356', borderRadius:'50% 50% 50% 0', transform:'rotate(-45deg)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 12px rgba(2,19,86,0.35)' }}>
                  <div style={{ width:'12px', height:'12px', background:'#FADB24', borderRadius:'50%', transform:'rotate(45deg)' }}></div>
                </div>
                <div style={{ position:'absolute', bottom:'10px', right:'10px', background:'rgba(255,255,255,0.92)', padding:'5px 10px', borderRadius:'6px', fontSize:'11px', fontWeight:700, color:'#021356', textTransform:'uppercase' }}>📍 {im.bairro} · Praia Grande-SP</div>
              </div>
            </div>

            {/* Direita — CTA */}
            <div style={{ padding: mobile ? '20px 16px' : '32px 0 0', background: mobile ? '#f0f2f8' : 'transparent' }}>
              <div style={{ background:'#fff', border:'1px solid rgba(2,19,86,0.10)', borderRadius:'20px', padding: mobile ? '20px' : '28px', position: mobile ? 'relative' : 'sticky', top: mobile ? 'auto' : '80px', boxShadow:'0 4px 24px rgba(2,19,86,0.12)', borderTop:'4px solid #FADB24' }}>
                <div style={{ fontFamily:'Montserrat,sans-serif', fontSize: mobile ? '28px' : '34px', fontWeight:800, color:'#021356', marginBottom:'4px', letterSpacing:'-1px' }}>{formatPreco(im.preco, im.finalidade)}</div>
                <div style={{ fontSize:'12px', color:'#8a91b0', marginBottom:'16px', lineHeight:1.7, fontWeight:500 }}>
                  {im.condo ? `+ Cond. R$ ${Number(im.condo).toLocaleString('pt-BR')}/mês` : ''}{im.iptu ? ` · IPTU R$ ${Number(im.iptu).toLocaleString('pt-BR')}/ano` : ''}<br/>
                  <span style={{ color:'#1a3fbb', fontWeight:700, fontSize:'11px', textTransform:'uppercase' }}>✓ Atendimento direto com o corretor</span>
                </div>

                <div style={{ display:'flex', flexWrap:'wrap', gap:'6px', marginBottom:'16px' }}>
                  {['✓ CRECI Ativo','✓ Sem taxa extra','✓ Resposta rápida'].map((t,i) => (
                    <div key={i} style={{ background:'rgba(250,219,36,0.12)', color:'#021356', borderRadius:'6px', padding:'4px 9px', fontSize:'10px', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.3px', border:'1px solid rgba(250,219,36,0.35)' }}>{t}</div>
                  ))}
                </div>

                <span style={{ fontSize:'12px', fontWeight:700, color:'#021356', marginBottom:'12px', display:'block', textTransform:'uppercase', letterSpacing:'0.5px' }}>Tenho interesse neste imóvel</span>
                {['Seu nome completo','WhatsApp com DDD','E-mail (opcional)'].map((ph,i) => (
                  <input key={i} placeholder={ph} type={i===1?'tel':i===2?'email':'text'}
                    style={{ width:'100%', padding:'12px 14px', border:'1.5px solid rgba(2,19,86,0.10)', borderRadius:'10px', fontFamily:'Montserrat,sans-serif', fontSize:'13px', fontWeight:500, color:'#0a0f2e', background:'#f0f2f8', outline:'none', marginBottom:'10px' }} />
                ))}
                <select style={{ width:'100%', padding:'12px 14px', border:'1.5px solid rgba(2,19,86,0.10)', borderRadius:'10px', fontFamily:'Montserrat,sans-serif', fontSize:'13px', fontWeight:500, color:'#4a5070', background:'#f0f2f8', outline:'none', marginBottom:'10px', cursor:'pointer' }}>
                  <option value="">Melhor horário para contato</option>
                  <option>Manhã (8h–12h)</option><option>Tarde (12h–18h)</option><option>Noite (18h–21h)</option><option>Qualquer horário</option>
                </select>
                <button style={{ width:'100%', padding:'15px', background:'#021356', color:'#fff', border:'none', borderRadius:'10px', fontFamily:'Montserrat,sans-serif', fontSize:'13px', fontWeight:700, cursor:'pointer', marginBottom:'10px', textTransform:'uppercase', letterSpacing:'0.5px', borderBottom:'3px solid #FADB24' }}>
                  📞 Quero receber contato
                </button>
                <a href={`https://wa.me/5513999990000?text=Olá Gabriel! Tenho interesse no imóvel: ${im.titulo} (Cód. ${im.cod}) - ${im.bairro}, Praia Grande`} target="_blank" rel="noopener noreferrer"
                  style={{ width:'100%', padding:'14px', background:'#25d366', color:'#fff', border:'none', borderRadius:'10px', fontFamily:'Montserrat,sans-serif', fontSize:'13px', fontWeight:700, cursor:'pointer', marginBottom:'16px', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', textTransform:'uppercase', letterSpacing:'0.4px', textDecoration:'none' }}>
                  💬 Chamar no WhatsApp agora
                </a>

                <div style={{ display:'flex', alignItems:'center', gap:'10px', paddingTop:'14px', borderTop:'1px solid rgba(2,19,86,0.08)' }}>
                  <div style={{ width:'44px', height:'44px', borderRadius:'50%', background:'#021356', display:'flex', alignItems:'center', justifyContent:'center', color:'#FADB24', fontWeight:800, fontSize:'14px', flexShrink:0, border:'2px solid #FADB24' }}>GB</div>
                  <div>
                    <span style={{ fontSize:'14px', fontWeight:700, color:'#021356', display:'block', marginBottom:'2px' }}>Gabriel Bin</span>
                    <span style={{ fontSize:'11px', color:'#8a91b0', fontWeight:500 }}>CRECI-SP 302244-F · Corretor autônomo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA flutuante mobile */}
        {mobile && (
          <div style={{ position:'fixed', bottom:0, left:0, right:0, padding:'12px 16px', background:'#fff', borderTop:'2px solid rgba(2,19,86,0.10)', display:'flex', gap:'10px', zIndex:50, boxShadow:'0 -4px 20px rgba(2,19,86,0.12)' }}>
            <button style={{ flex:1, padding:'13px', background:'#021356', color:'#fff', border:'none', borderRadius:'10px', fontFamily:'Montserrat,sans-serif', fontSize:'12px', fontWeight:700, cursor:'pointer', textTransform:'uppercase', borderBottom:'2px solid #FADB24' }}>
              📞 Solicitar contato
            </button>
            <a href={`https://wa.me/5513999990000?text=Olá! Interesse no imóvel: ${im.titulo} (${im.cod})`} target="_blank" rel="noopener noreferrer"
              style={{ flex:1, padding:'13px', background:'#25d366', color:'#fff', border:'none', borderRadius:'10px', fontFamily:'Montserrat,sans-serif', fontSize:'12px', fontWeight:700, cursor:'pointer', textTransform:'uppercase', textDecoration:'none', display:'flex', alignItems:'center', justifyContent:'center', gap:'6px' }}>
              💬 WhatsApp
            </a>
          </div>
        )}

        <Footer />
      </>
    )
  }
  return null
  function voltarListagem() { setTela('listing'); window.scrollTo(0,0) }
}
