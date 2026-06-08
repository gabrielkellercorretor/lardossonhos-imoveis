'use client'
import { useState } from 'react'

const imoveis = [
  { id: 1, tipo: 'Apartamento', titulo: 'Apartamento 3 dormitórios com vista para o mar', bairro: 'Embaré', cidade: 'Santos', preco: 680000, modalidade: 'venda', quartos: 3, banheiros: 2, vagas: 2, area: 88, andar: '8º', destaque: true, cod: '42225', ph: 'ph-1', emoji: '🏠', condo: 780, iptu: 1200, features: ['Varanda com vista canal','Cozinha planejada','Armários embutidos','2 vagas cobertas','Portaria 24h','Salão de festas','Academia','Piscina rooftop','Pet friendly','Aceita financiamento','Pronto para morar','Reformado 2023'] },
  { id: 2, tipo: 'Apartamento', titulo: 'Apartamento 2 dormitórios reformado', bairro: 'Boqueirão', cidade: 'Santos', preco: 395000, modalidade: 'venda', quartos: 2, banheiros: 1, vagas: 1, area: 70, andar: '4º', destaque: false, cod: '38891', ph: 'ph-2', emoji: '🏢', condo: 480, iptu: 900, features: ['Reformado 2022','Armários embutidos','Portaria 24h','Próximo ao metrô','Aceita financiamento'] },
  { id: 3, tipo: 'Casa', titulo: 'Casa 3 dormitórios com quintal', bairro: 'Gonzaga', cidade: 'Santos', preco: 3200, modalidade: 'aluguel', quartos: 3, banheiros: 2, vagas: 2, area: 120, andar: null, destaque: false, cod: '51104', ph: 'ph-3', emoji: '🏡', condo: null, iptu: null, features: ['Quintal amplo','2 vagas','Próximo à praia','Pet friendly'] },
  { id: 4, tipo: 'Terreno', titulo: 'Terreno comercial em área nobre', bairro: 'Vila Belmiro', cidade: 'Santos', preco: 220000, modalidade: 'venda', quartos: null, banheiros: null, vagas: null, area: 250, andar: null, destaque: false, cod: '29934', ph: 'ph-4', emoji: '🏗️', condo: null, iptu: 600, features: ['Área comercial','Documentação ok','Topografia plana'] },
  { id: 5, tipo: 'Cobertura', titulo: 'Cobertura 4 dormitórios vista mar', bairro: 'Ponta da Praia', cidade: 'Santos', preco: 1200000, modalidade: 'venda', quartos: 4, banheiros: 3, vagas: 3, area: 210, andar: '12º', destaque: true, cod: '60012', ph: 'ph-5', emoji: '🌊', condo: 1200, iptu: 3200, features: ['Vista mar panorâmica','Terraço privativo','Churrasqueira','3 vagas','Spa e sauna','Condomínio clube'] },
  { id: 6, tipo: 'Studio', titulo: 'Studio moderno mobiliado', bairro: 'Gonzaga', cidade: 'Santos', preco: 1800, modalidade: 'aluguel', quartos: 1, banheiros: 1, vagas: 1, area: 42, andar: '3º', destaque: false, cod: '44330', ph: 'ph-6', emoji: '🏠', condo: 320, iptu: null, features: ['Mobiliado','Cozinha americana','Wi-Fi incluso','Portaria 24h'] },
]

const formatPreco = (preco, modalidade) => {
  if (modalidade === 'aluguel') return `R$ ${preco.toLocaleString('pt-BR')}/mês`
  if (preco >= 1000000) return `R$ ${(preco/1000000).toFixed(1).replace('.',',')} mi`
  return `R$ ${preco.toLocaleString('pt-BR')}`
}

export default function Home() {
  const [tela, setTela] = useState('home')
  const [imovelAtivo, setImovelAtivo] = useState(null)
  const [filtros, setFiltros] = useState({ modalidade: 'todos', tipo: 'todos', quartos: 'todos', bairro: 'todos' })
  const [busca, setBusca] = useState('')

  const abrirImovel = (imovel) => { setImovelAtivo(imovel); setTela('imovel'); window.scrollTo(0,0) }
  const voltarListagem = () => { setTela('listing'); window.scrollTo(0,0) }

  const imoveisFiltrados = imoveis.filter(i => {
    if (filtros.modalidade !== 'todos' && i.modalidade !== filtros.modalidade) return false
    if (filtros.tipo !== 'todos' && i.tipo !== filtros.tipo) return false
    if (filtros.quartos !== 'todos') {
      if (filtros.quartos === '4+' && (i.quartos < 4)) return false
      else if (filtros.quartos !== '4+' && i.quartos !== parseInt(filtros.quartos)) return false
    }
    if (filtros.bairro !== 'todos' && i.bairro !== filtros.bairro) return false
    if (busca && !i.titulo.toLowerCase().includes(busca.toLowerCase()) && !i.bairro.toLowerCase().includes(busca.toLowerCase())) return false
    return true
  })

  const s = {
    nav: { background:'var(--brand)', padding:'0 32px', display:'flex', alignItems:'center', justifyContent:'space-between', height:'66px', position:'sticky', top:0, zIndex:100, borderBottom:'3px solid var(--accent)' },
    logo: { fontFamily:'Montserrat,sans-serif', fontSize:'18px', fontWeight:800, color:'var(--white)', display:'flex', alignItems:'center', gap:'10px', cursor:'pointer', textTransform:'uppercase', letterSpacing:'-0.3px' },
    logoDot: { width:'10px', height:'10px', background:'var(--accent)', borderRadius:'50%', flexShrink:0 },
    navLinks: { display:'flex', gap:'28px', alignItems:'center' },
    navA: { color:'rgba(255,255,255,0.72)', textDecoration:'none', fontSize:'13px', fontWeight:500, cursor:'pointer' },
    navCta: { background:'var(--accent)', color:'var(--brand)', fontWeight:700, padding:'9px 20px', borderRadius:'8px', fontSize:'12px', cursor:'pointer', border:'none', textTransform:'uppercase', letterSpacing:'0.4px', fontFamily:'Montserrat,sans-serif' },
    hero: { background:'var(--brand)', minHeight:'560px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'80px 32px 60px', position:'relative', overflow:'hidden' },
    heroTag: { background:'rgba(250,219,36,0.15)', color:'var(--accent)', fontSize:'11px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', padding:'7px 18px', borderRadius:'20px', marginBottom:'28px', border:'1px solid rgba(250,219,36,0.25)' },
    heroH1: { fontFamily:'Montserrat,sans-serif', fontSize:'48px', fontWeight:800, color:'var(--white)', textAlign:'center', lineHeight:1.12, maxWidth:'680px', marginBottom:'18px', letterSpacing:'-1px' },
    heroP: { color:'rgba(255,255,255,0.60)', fontSize:'16px', textAlign:'center', maxWidth:'480px', lineHeight:1.7, marginBottom:'48px', fontWeight:400 },
    searchBar: { background:'var(--white)', borderRadius:'16px', padding:'8px', display:'flex', alignItems:'center', width:'100%', maxWidth:'840px', boxShadow:'0 8px 48px rgba(0,0,0,0.24)', border:'2px solid rgba(250,219,36,0.3)', flexWrap:'wrap', gap:'0' },
    searchInput: { flex:1, minWidth:'180px', padding:'13px 16px', border:'none', background:'transparent', fontFamily:'Montserrat,sans-serif', fontSize:'13px', color:'var(--text)', outline:'none', fontWeight:500 },
    searchSelect: { flex:1, minWidth:'120px', padding:'13px 16px', border:'none', background:'transparent', fontFamily:'Montserrat,sans-serif', fontSize:'13px', color:'var(--text)', outline:'none', cursor:'pointer', fontWeight:500 },
    searchDiv: { width:'1px', height:'36px', background:'var(--border)', flexShrink:0 },
    searchBtn: { background:'var(--accent)', color:'var(--brand)', border:'none', borderRadius:'12px', padding:'14px 28px', fontFamily:'Montserrat,sans-serif', fontSize:'13px', fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:'8px', textTransform:'uppercase', letterSpacing:'0.5px', whiteSpace:'nowrap' },
    heroStats: { display:'flex', gap:'56px', marginTop:'44px' },
    statNum: { fontFamily:'Montserrat,sans-serif', fontSize:'34px', fontWeight:800, color:'var(--accent)', display:'block', letterSpacing:'-1px' },
    statLabel: { fontSize:'11px', color:'rgba(255,255,255,0.50)', letterSpacing:'0.5px', fontWeight:500, textTransform:'uppercase' },
    section: { padding:'52px 32px' },
    sectionHeader: { display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'28px' },
    sectionTitle: { fontFamily:'Montserrat,sans-serif', fontSize:'28px', fontWeight:800, color:'var(--text)', lineHeight:1.2, letterSpacing:'-0.5px' },
    sectionSmall: { display:'block', fontSize:'11px', fontWeight:700, color:'var(--accent-dark)', marginBottom:'6px', letterSpacing:'1.5px', textTransform:'uppercase' },
    sectionLink: { fontSize:'12px', color:'var(--brand-light)', fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:'4px', textTransform:'uppercase', letterSpacing:'0.5px', background:'none', border:'none', fontFamily:'Montserrat,sans-serif' },
    card: { background:'var(--white)', borderRadius:'20px', overflow:'hidden', cursor:'pointer', transition:'transform 0.25s, box-shadow 0.25s', boxShadow:'var(--shadow-card)', border:'1px solid var(--border)' },
    cardsGrid: { display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'20px' },
    cardImgWrap: { position:'relative', overflow:'hidden' },
    imgPlaceholder: { width:'100%', height:'200px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'48px', color:'rgba(0,0,0,0.08)' },
    cardBadgeVenda: { position:'absolute', top:'12px', left:'12px', background:'var(--brand)', color:'var(--white)', fontSize:'10px', fontWeight:700, padding:'4px 10px', borderRadius:'6px', letterSpacing:'0.8px', textTransform:'uppercase' },
    cardBadgeAluguel: { position:'absolute', top:'12px', left:'12px', background:'#1a3fbb', color:'var(--white)', fontSize:'10px', fontWeight:700, padding:'4px 10px', borderRadius:'6px', letterSpacing:'0.8px', textTransform:'uppercase' },
    cardBadgeDestaque: { position:'absolute', top:'12px', left:'12px', background:'var(--accent)', color:'var(--brand)', fontSize:'10px', fontWeight:700, padding:'4px 10px', borderRadius:'6px', letterSpacing:'0.8px', textTransform:'uppercase' },
    cardBody: { padding:'18px 20px 20px' },
    cardPrice: { fontSize:'20px', fontWeight:800, color:'var(--brand)', marginBottom:'4px', letterSpacing:'-0.5px' },
    cardTitle: { fontSize:'13px', color:'var(--text2)', fontWeight:500, marginBottom:'14px', lineHeight:1.5 },
    cardAttrs: { display:'flex', gap:'14px', paddingTop:'14px', borderTop:'1px solid var(--border)' },
    attr: { display:'flex', alignItems:'center', gap:'5px', fontSize:'11px', color:'var(--text2)', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.2px' },
    footer: { background:'var(--brand)', borderTop:'3px solid var(--accent)', padding:'24px 40px', display:'flex', alignItems:'center', justifyContent:'space-between' },
    footerP: { fontSize:'11px', color:'rgba(255,255,255,0.40)', fontWeight:500 },
  }

  const phColors = {
    'ph-1': 'linear-gradient(135deg,#b8cce8,#8ab0d8)',
    'ph-2': 'linear-gradient(135deg,#b8c8e8,#90a8d8)',
    'ph-3': 'linear-gradient(135deg,#c8d4e8,#a8b8d0)',
    'ph-4': 'linear-gradient(135deg,#d4d8e8,#b0b8d0)',
    'ph-5': 'linear-gradient(135deg,#a8c0e0,#7098c8)',
    'ph-6': 'linear-gradient(135deg,#c0cce0,#98aac8)',
  }

  const CardImovel = ({ imovel }) => (
    <div style={s.card} onClick={() => abrirImovel(imovel)}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow='0 14px 44px rgba(2,19,86,0.14)' }}
      onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='var(--shadow-card)' }}>
      <div style={s.cardImgWrap}>
        <div style={{ ...s.imgPlaceholder, background: phColors[imovel.ph] }}>{imovel.emoji}</div>
        <div style={imovel.destaque ? s.cardBadgeDestaque : imovel.modalidade === 'aluguel' ? s.cardBadgeAluguel : s.cardBadgeVenda}>
          {imovel.destaque ? '✦ Destaque' : imovel.modalidade === 'aluguel' ? 'Aluguel' : 'Venda'}
        </div>
      </div>
      <div style={s.cardBody}>
        <div style={s.cardPrice}>{formatPreco(imovel.preco, imovel.modalidade)}</div>
        <div style={s.cardTitle}>{imovel.tipo} · {imovel.bairro}, {imovel.cidade}</div>
        <div style={s.cardAttrs}>
          <div style={s.attr}>📐 {imovel.area} m²</div>
          {imovel.quartos && <div style={s.attr}>🛏 {imovel.quartos} qtos</div>}
          {imovel.vagas && <div style={s.attr}>🚗 {imovel.vagas} vg</div>}
        </div>
      </div>
    </div>
  )

  const Nav = () => (
    <nav style={s.nav}>
      <div style={s.logo} onClick={() => setTela('home')}>
        <div style={s.logoDot}></div>
        Gabriel Bin <span style={{ color:'var(--accent)' }}>&nbsp;Imóveis</span>
      </div>
      <div style={s.navLinks}>
        <span style={s.navA} onClick={() => { setFiltros({...filtros, modalidade:'venda'}); setTela('listing') }}>Comprar</span>
        <span style={s.navA} onClick={() => { setFiltros({...filtros, modalidade:'aluguel'}); setTela('listing') }}>Alugar</span>
        <span style={s.navA} onClick={() => setTela('listing')}>Imóveis</span>
        <button style={s.navCta} onClick={() => setTela('listing')}>Ver imóveis</button>
      </div>
    </nav>
  )

  const Footer = () => (
    <footer style={s.footer}>
      <div style={{...s.logo, fontSize:'16px'}}>
        <div style={s.logoDot}></div>
        Gabriel Bin <span style={{color:'var(--accent)'}}>&nbsp;Imóveis</span>
      </div>
      <p style={s.footerP}>CRECI-SP 302244-F · Santos e Região · © 2026</p>
      <div style={{display:'flex', gap:'10px'}}>
        {['▶','◆','●'].map((ic,i) => (
          <div key={i} style={{width:'32px',height:'32px',background:'rgba(250,219,36,0.12)',borderRadius:'8px',border:'1px solid rgba(250,219,36,0.2)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--accent)',fontSize:'13px',cursor:'pointer'}}>{ic}</div>
        ))}
      </div>
    </footer>
  )

  // ===== TELA HOME =====
  if (tela === 'home') return (
    <>
      <Nav />
      <section style={s.hero}>
        <div style={s.heroTag}>✦ Corretor autônomo · Santos e região</div>
        <h1 style={s.heroH1}>Encontre o imóvel <span style={{color:'var(--accent)'}}>certo</span><br/>para o seu momento</h1>
        <p style={s.heroP}>Atendimento personalizado, sem intermediários. Seleciono os melhores imóveis da região para você.</p>
        <div style={s.searchBar}>
          <input style={s.searchInput} placeholder="Bairro, cidade ou código..." value={busca} onChange={e => setBusca(e.target.value)} />
          <div style={s.searchDiv}></div>
          <select style={s.searchSelect} onChange={e => setFiltros({...filtros, modalidade: e.target.value === 'Comprar' ? 'venda' : 'aluguel'})}>
            <option>Comprar</option><option>Alugar</option>
          </select>
          <div style={s.searchDiv}></div>
          <select style={s.searchSelect} onChange={e => setFiltros({...filtros, tipo: e.target.value === 'Tipo de imóvel' ? 'todos' : e.target.value})}>
            <option>Tipo de imóvel</option><option>Apartamento</option><option>Casa</option><option>Terreno</option><option>Cobertura</option><option>Studio</option>
          </select>
          <div style={s.searchDiv}></div>
          <select style={s.searchSelect} onChange={e => setFiltros({...filtros, quartos: e.target.value === 'Quartos' ? 'todos' : e.target.value.split(' ')[0]})}>
            <option>Quartos</option><option>1 quarto</option><option>2 quartos</option><option>3 quartos</option><option>4+</option>
          </select>
          <button style={s.searchBtn} onClick={() => setTela('listing')}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            Buscar
          </button>
        </div>
        <div style={s.heroStats}>
          <div><span style={s.statNum}>47</span><span style={s.statLabel}>Imóveis disponíveis</span></div>
          <div><span style={s.statNum}>8 anos</span><span style={s.statLabel}>De experiência</span></div>
          <div><span style={s.statNum}>200+</span><span style={s.statLabel}>Famílias atendidas</span></div>
        </div>
      </section>

      <section style={s.section}>
        <div style={s.sectionHeader}>
          <div style={s.sectionTitle}>
            <small style={s.sectionSmall}>em destaque</small>
            Imóveis selecionados
          </div>
          <button style={s.sectionLink} onClick={() => setTela('listing')}>
            Ver todos
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
        <div style={s.cardsGrid}>
          {imoveis.map(i => <CardImovel key={i.id} imovel={i} />)}
        </div>
      </section>
      <Footer />
    </>
  )

  // ===== TELA LISTAGEM =====
  if (tela === 'listing') return (
    <>
      <Nav />
      <div style={{display:'grid', gridTemplateColumns:'290px 1fr', minHeight:'calc(100vh - 66px)'}}>
        <aside style={{background:'var(--white)', borderRight:'1px solid var(--border)', padding:'28px 22px', position:'sticky', top:'66px', height:'calc(100vh - 66px)', overflowY:'auto'}}>
          <h3 style={{fontSize:'16px', fontWeight:800, marginBottom:'24px', color:'var(--brand)', textTransform:'uppercase', letterSpacing:'0.5px'}}>Filtrar imóveis</h3>
          {[
            { label:'Finalidade', key:'modalidade', opts:[{v:'todos',l:'Todos'},{v:'venda',l:'Comprar'},{v:'aluguel',l:'Alugar'}] },
            { label:'Quartos', key:'quartos', opts:[{v:'todos',l:'Todos'},{v:'1',l:'1'},{v:'2',l:'2'},{v:'3',l:'3'},{v:'4+',l:'4+'}] },
            { label:'Bairro', key:'bairro', opts:[{v:'todos',l:'Todos'},{v:'Embaré',l:'Embaré'},{v:'Boqueirão',l:'Boqueirão'},{v:'Gonzaga',l:'Gonzaga'},{v:'Ponta da Praia',l:'Ponta da Praia'},{v:'Vila Belmiro',l:'Vila Belmiro'}] },
          ].map(fg => (
            <div key={fg.key} style={{marginBottom:'26px'}}>
              <span style={{fontSize:'10px', fontWeight:700, color:'var(--text3)', textTransform:'uppercase', letterSpacing:'1.2px', marginBottom:'10px', display:'block'}}>{fg.label}</span>
              <div style={{display:'flex', flexWrap:'wrap', gap:'7px'}}>
                {fg.opts.map(o => (
                  <button key={o.v} onClick={() => setFiltros({...filtros, [fg.key]: o.v})}
                    style={{padding:'7px 13px', border:`1.5px solid ${filtros[fg.key]===o.v ? 'var(--brand)' : 'var(--border)'}`, borderRadius:'8px', fontSize:'12px', color: filtros[fg.key]===o.v ? 'var(--white)' : 'var(--text2)', background: filtros[fg.key]===o.v ? 'var(--brand)' : 'transparent', cursor:'pointer', fontFamily:'Montserrat,sans-serif', fontWeight:600}}>
                    {o.l}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button onClick={() => setFiltros({modalidade:'todos', tipo:'todos', quartos:'todos', bairro:'todos'})}
            style={{width:'100%', padding:'10px', background:'transparent', color:'var(--text3)', border:'none', fontFamily:'Montserrat,sans-serif', fontSize:'12px', fontWeight:500, cursor:'pointer', marginTop:'8px'}}>
            Limpar filtros
          </button>
        </aside>

        <main style={{background:'var(--bg)'}}>
          <div style={{background:'var(--white)', borderBottom:'1px solid var(--border)', padding:'16px 26px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <span style={{fontSize:'13px', color:'var(--text2)', fontWeight:500}}>
              <strong style={{color:'var(--brand)', fontWeight:800}}>{imoveisFiltrados.length} imóveis</strong> encontrados
            </span>
          </div>
          <div style={{padding:'22px 24px', display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:'16px'}}>
            {imoveisFiltrados.length > 0
              ? imoveisFiltrados.map(i => <CardImovel key={i.id} imovel={i} />)
              : <div style={{gridColumn:'1/-1', textAlign:'center', padding:'80px 20px', color:'var(--text3)'}}>
                  <div style={{fontSize:'48px', marginBottom:'16px'}}>🔍</div>
                  <p style={{fontSize:'16px', fontWeight:600, color:'var(--text2)'}}>Nenhum imóvel encontrado</p>
                  <p style={{fontSize:'13px', marginTop:'8px'}}>Tente ajustar os filtros</p>
                </div>
            }
          </div>
        </main>
      </div>
    </>
  )

  // ===== TELA LANDING PAGE =====
  if (tela === 'imovel' && imovelAtivo) {
    const im = imovelAtivo
    return (
      <>
        {/* Header limpo */}
        <div style={{background:'var(--brand)', padding:'16px 40px', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'3px solid var(--accent)'}}>
          <button onClick={voltarListagem} style={{display:'flex', alignItems:'center', gap:'8px', color:'rgba(255,255,255,0.65)', fontSize:'12px', fontWeight:600, cursor:'pointer', background:'none', border:'none', fontFamily:'Montserrat,sans-serif', textTransform:'uppercase', letterSpacing:'0.4px'}}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Voltar à busca
          </button>
          <div style={{...s.logo, fontSize:'16px'}} onClick={() => setTela('home')}>
            <div style={s.logoDot}></div>
            Gabriel Bin <span style={{color:'var(--accent)'}}>&nbsp;Imóveis</span>
          </div>
          <div style={{display:'flex', gap:'10px'}}>
            {['📤 Compartilhar','♡ Favoritar'].map((t,i) => (
              <button key={i} style={{background:'rgba(255,255,255,0.10)', border:'1px solid rgba(255,255,255,0.18)', borderRadius:'8px', color:'var(--white)', padding:'7px 14px', fontSize:'11px', fontFamily:'Montserrat,sans-serif', fontWeight:600, cursor:'pointer', textTransform:'uppercase', letterSpacing:'0.3px'}}>{t}</button>
            ))}
          </div>
        </div>

        {/* Galeria */}
        <div style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gridTemplateRows:'260px 180px', gap:'3px', background:'#000'}}>
          <div style={{gridRow:'1/3', background: phColors[im.ph], display:'flex', alignItems:'center', justifyContent:'center', fontSize:'80px'}}>{im.emoji}</div>
          {['ph-2','ph-3','ph-4','ph-5'].map((ph,i) => (
            <div key={i} style={{background: phColors[ph], position:'relative', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'32px', overflow:'hidden'}}>
              {i === 3 && <div style={{position:'absolute', inset:0, background:'rgba(2,19,86,0.58)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--white)', fontSize:'13px', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.5px', cursor:'pointer'}}>📷 +12 fotos</div>}
            </div>
          ))}
        </div>

        <div style={{maxWidth:'1180px', margin:'0 auto', padding:'0 40px 80px'}}>
          <div style={{display:'grid', gridTemplateColumns:'1fr 370px', gap:'48px', alignItems:'start'}}>
            <div>
              <div style={{fontSize:'11px', fontWeight:700, color:'var(--brand-light)', textTransform:'uppercase', letterSpacing:'1.5px', margin:'32px 0 10px', display:'flex', alignItems:'center', gap:'6px'}}>
                📍 {im.bairro} · {im.cidade}, SP
              </div>
              <h1 style={{fontSize:'32px', fontWeight:800, color:'var(--brand)', lineHeight:1.15, marginBottom:'10px', letterSpacing:'-0.8px'}}>{im.titulo}</h1>
              <p style={{display:'flex', alignItems:'center', gap:'6px', fontSize:'13px', color:'var(--text2)', marginBottom:'28px', fontWeight:500}}>
                📍 {im.bairro}, {im.cidade}-SP · Cód. {im.cod}
              </p>

              <div style={{display:'flex', background:'var(--bg)', borderRadius:'12px', overflow:'hidden', marginBottom:'36px', border:'1px solid var(--border)'}}>
                {[
                  {icon:'📐', val:im.area, label:'m² área'},
                  ...(im.quartos ? [{icon:'🛏️', val:im.quartos, label:'dormitórios'}] : []),
                  ...(im.banheiros ? [{icon:'🚿', val:im.banheiros, label:'banheiros'}] : []),
                  ...(im.vagas ? [{icon:'🚗', val:im.vagas, label:'vagas'}] : []),
                  ...(im.andar ? [{icon:'🏢', val:im.andar, label:'andar'}] : []),
                ].map((a,i,arr) => (
                  <div key={i} style={{flex:1, padding:'20px 14px', textAlign:'center', borderRight: i<arr.length-1 ? '1px solid var(--border)' : 'none'}}>
                    <span style={{fontSize:'20px', marginBottom:'6px', display:'block'}}>{a.icon}</span>
                    <span style={{fontSize:'22px', fontWeight:800, color:'var(--brand)', display:'block', marginBottom:'3px', letterSpacing:'-0.5px'}}>{a.val}</span>
                    <span style={{fontSize:'10px', color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.8px', fontWeight:600}}>{a.label}</span>
                  </div>
                ))}
              </div>

              {[
                { titulo:'Sobre este imóvel', conteudo: (
                  <p style={{fontSize:'14px', color:'var(--text2)', lineHeight:1.85, marginBottom:'36px', fontWeight:400}}>
                    {im.tipo} em excelente localização no {im.bairro}, Santos. Imóvel com {im.area}m²
                    {im.quartos ? `, ${im.quartos} dormitórios` : ''}{im.banheiros ? `, ${im.banheiros} banheiro(s)` : ''}{im.vagas ? ` e ${im.vagas} vaga(s) de garagem` : ''}.
                    {im.andar ? ` Localizado no ${im.andar} andar.` : ''} Documentação em dia e pronto para negociação.
                  </p>
                )},
                { titulo:'Características e diferenciais', conteudo: (
                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'36px'}}>
                    {im.features.map((f,i) => (
                      <div key={i} style={{display:'flex', alignItems:'center', gap:'10px', fontSize:'13px', color:'var(--text2)', fontWeight:600}}>
                        <div style={{width:'8px', height:'8px', borderRadius:'50%', background:'var(--accent)', flexShrink:0, border:'2px solid var(--brand)'}}></div>
                        {f}
                      </div>
                    ))}
                  </div>
                )},
              ].map((sec, i) => (
                <div key={i}>
                  <div style={{fontSize:'16px', fontWeight:800, color:'var(--brand)', marginBottom:'16px', paddingBottom:'12px', borderBottom:'2px solid var(--accent)', textTransform:'uppercase', letterSpacing:'0.3px'}}>{sec.titulo}</div>
                  {sec.conteudo}
                </div>
              ))}

              <div style={{fontSize:'16px', fontWeight:800, color:'var(--brand)', marginBottom:'16px', paddingBottom:'12px', borderBottom:'2px solid var(--accent)', textTransform:'uppercase', letterSpacing:'0.3px'}}>Valores</div>
              <div style={{background:'var(--bg)', borderRadius:'12px', padding:'20px 24px', marginBottom:'36px', border:'1px solid var(--border)'}}>
                {[
                  {l:'Valor '+(im.modalidade==='aluguel'?'do aluguel':'de venda'), v: im.modalidade==='aluguel' ? `R$ ${im.preco.toLocaleString('pt-BR')}/mês` : `R$ ${im.preco.toLocaleString('pt-BR')}`, bold:true},
                  ...(im.condo ? [{l:'Condomínio', v:`R$ ${im.condo.toLocaleString('pt-BR')}/mês`}] : []),
                  ...(im.iptu ? [{l:'IPTU', v:`R$ ${im.iptu.toLocaleString('pt-BR')}/ano`}] : []),
                ].map((row,i,arr) => (
                  <div key={i} style={{display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom: i<arr.length-1 ? '1px solid var(--border)' : 'none', fontSize:'13px'}}>
                    <span style={{color:'var(--text2)', fontWeight:500}}>{row.l}</span>
                    <span style={{fontWeight: row.bold ? 800 : 600, color: row.bold ? 'var(--brand)' : 'var(--text)', fontSize: row.bold ? '16px' : '13px', letterSpacing: row.bold ? '-0.5px' : 0}}>{row.v}</span>
                  </div>
                ))}
              </div>

              <div style={{fontSize:'16px', fontWeight:800, color:'var(--brand)', marginBottom:'16px', paddingBottom:'12px', borderBottom:'2px solid var(--accent)', textTransform:'uppercase', letterSpacing:'0.3px'}}>Localização</div>
              <div style={{background:'linear-gradient(135deg,#b8c8e0,#8ab0d8)', borderRadius:'12px', height:'240px', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'36px', position:'relative', border:'1px solid var(--border)'}}>
                <div style={{width:'36px', height:'36px', background:'var(--brand)', borderRadius:'50% 50% 50% 0', transform:'rotate(-45deg)', boxShadow:'0 4px 12px rgba(2,19,86,0.35)', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <div style={{width:'14px', height:'14px', background:'var(--accent)', borderRadius:'50%', transform:'rotate(45deg)'}}></div>
                </div>
                <div style={{position:'absolute', bottom:'12px', right:'12px', background:'rgba(255,255,255,0.92)', padding:'6px 12px', borderRadius:'6px', fontSize:'11px', fontWeight:700, color:'var(--brand)', textTransform:'uppercase', letterSpacing:'0.3px'}}>📍 {im.bairro} · {im.cidade}-SP</div>
              </div>
            </div>

            {/* CTA Card */}
            <div>
              <div style={{background:'var(--white)', border:'1px solid var(--border)', borderRadius:'20px', padding:'28px', position:'sticky', top:'80px', boxShadow:'var(--shadow)', borderTop:'4px solid var(--accent)'}}>
                <div style={{fontSize:'34px', fontWeight:800, color:'var(--brand)', marginBottom:'4px', letterSpacing:'-1px'}}>{formatPreco(im.preco, im.modalidade)}</div>
                <div style={{fontSize:'12px', color:'var(--text3)', marginBottom:'20px', lineHeight:1.7, fontWeight:500}}>
                  {im.condo ? `+ Cond. R$ ${im.condo}/mês` : ''}{im.iptu ? ` · IPTU R$ ${im.iptu}/ano` : ''}<br/>
                  <span style={{color:'var(--brand-light)', fontWeight:700, fontSize:'11px', textTransform:'uppercase', letterSpacing:'0.3px'}}>✓ Atendimento direto com o corretor</span>
                </div>
                <div style={{display:'flex', flexWrap:'wrap', gap:'7px', marginBottom:'18px'}}>
                  {['✓ CRECI Ativo','✓ Exclusividade','✓ Sem taxa extra'].map((t,i) => (
                    <div key={i} style={{background:'rgba(250,219,36,0.12)', color:'var(--brand)', borderRadius:'6px', padding:'5px 10px', fontSize:'10px', fontWeight:700, display:'flex', alignItems:'center', gap:'4px', textTransform:'uppercase', letterSpacing:'0.3px', border:'1px solid rgba(250,219,36,0.35)'}}>{t}</div>
                  ))}
                </div>
                <span style={{fontSize:'12px', fontWeight:700, color:'var(--brand)', marginBottom:'14px', display:'block', textTransform:'uppercase', letterSpacing:'0.5px'}}>Tenho interesse neste imóvel</span>
                {['Seu nome completo','WhatsApp com DDD','E-mail (opcional)'].map((ph,i) => (
                  <input key={i} placeholder={ph} type={i===1?'tel':i===2?'email':'text'} style={{width:'100%', padding:'12px 14px', border:'1.5px solid var(--border)', borderRadius:'10px', fontFamily:'Montserrat,sans-serif', fontSize:'13px', fontWeight:500, color:'var(--text)', background:'var(--bg)', outline:'none', marginBottom:'10px'}} />
                ))}
                <select style={{width:'100%', padding:'12px 14px', border:'1.5px solid var(--border)', borderRadius:'10px', fontFamily:'Montserrat,sans-serif', fontSize:'13px', fontWeight:500, color:'var(--text2)', background:'var(--bg)', outline:'none', marginBottom:'10px', cursor:'pointer'}}>
                  <option value="">Melhor horário para contato</option>
                  <option>Manhã (8h–12h)</option><option>Tarde (12h–18h)</option><option>Noite (18h–21h)</option><option>Qualquer horário</option>
                </select>
                <button style={{width:'100%', padding:'16px', background:'var(--brand)', color:'var(--white)', border:'none', borderRadius:'10px', fontFamily:'Montserrat,sans-serif', fontSize:'13px', fontWeight:700, cursor:'pointer', marginBottom:'10px', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', textTransform:'uppercase', letterSpacing:'0.5px', borderBottom:'3px solid var(--accent)'}}>
                  📞 Quero receber contato
                </button>
                <button style={{width:'100%', padding:'14px', background:'#25d366', color:'var(--white)', border:'none', borderRadius:'10px', fontFamily:'Montserrat,sans-serif', fontSize:'13px', fontWeight:700, cursor:'pointer', marginBottom:'18px', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', textTransform:'uppercase', letterSpacing:'0.4px'}}>
                  💬 Chamar no WhatsApp agora
                </button>
                <div style={{display:'flex', alignItems:'center', gap:'12px', paddingTop:'16px', borderTop:'1px solid var(--border)'}}>
                  <div style={{width:'48px', height:'48px', borderRadius:'50%', background:'var(--brand)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--accent)', fontWeight:800, fontSize:'15px', flexShrink:0, border:'2px solid var(--accent)', fontFamily:'Montserrat,sans-serif'}}>GB</div>
                  <div>
                    <span style={{fontSize:'14px', fontWeight:700, color:'var(--brand)', display:'block', marginBottom:'2px'}}>Gabriel Bin</span>
                    <span style={{fontSize:'11px', color:'var(--text3)', fontWeight:500}}>CRECI-SP 302244-F · Corretor autônomo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return null
}
