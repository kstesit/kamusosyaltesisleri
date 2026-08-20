"use client";

import { FormEvent, useMemo, useState } from "react";

type Facility = {
  name: string; city: string; district: string;
  type: "Öğretmenevi" | "Polisevi" | "Misafirhane" | "Orduevi";
  price: string; tags: string[]; phone: string; distance?: string; verified: string;
};

const facilities: Facility[] = [
  { name: "Çankaya Öğretmenevi", city: "Ankara", district: "Çankaya", type: "Öğretmenevi", price: "750 TL’den", tags: ["Merkezde", "Otopark", "Kahvaltı"], phone: "0312 000 00 01", distance: "2,4 km", verified: "Bugün güncellendi" },
  { name: "Kültürpark Konukevi", city: "İzmir", district: "Konak", type: "Misafirhane", price: "850 TL’den", tags: ["Şehir merkezi", "Klima", "Aile odası"], phone: "0232 000 00 02", verified: "3 gün önce güncellendi" },
  { name: "Lara Polis Evi", city: "Antalya", district: "Muratpaşa", type: "Polisevi", price: "1.050 TL’den", tags: ["Denize yakın", "Restoran", "Otopark"], phone: "0242 000 00 03", verified: "Bu hafta güncellendi" },
  { name: "Bursa Orduevi", city: "Bursa", district: "Osmangazi", type: "Orduevi", price: "900 TL’den", tags: ["Merkezde", "Lokanta", "Ulaşım"], phone: "0224 000 00 04", verified: "Bu hafta güncellendi" },
];
const categories = ["Tümü", "Öğretmenevi", "Polisevi", "Misafirhane", "Orduevi"] as const;
const cities = [
  { name: "İstanbul", landmark: "Ayasofya", image: "/cities/istanbul.jpg" },
  { name: "Ankara", landmark: "Anıtkabir", image: "/cities/ankara.jpg" },
  { name: "İzmir", landmark: "Saat Kulesi", image: "/cities/izmir.jpg" },
  { name: "Bursa", landmark: "Ulu Cami", image: "/cities/bursa.jpg" },
  { name: "Antalya", landmark: "Düden Şelalesi", image: "/cities/antalya.jpg" },
  { name: "Gaziantep", landmark: "Zeugma Mozaik Müzesi", image: "/cities/gaziantep.jpg" },
  { name: "Diyarbakır", landmark: "Diyarbakır Surları", image: "/cities/diyarbakir.jpg" },
  { name: "Van", landmark: "Van Gölü", image: "/cities/van.jpg" },
  { name: "Muğla", landmark: "Ölüdeniz", image: "/cities/mugla.jpg" },
  { name: "Trabzon", landmark: "Sümela Manastırı", image: "/cities/trabzon.jpg" },
  { name: "Kayseri", landmark: "Erciyes Dağı", image: "/cities/kayseri.jpg" },
  { name: "Mersin", landmark: "Kızkalesi", image: "/cities/mersin.jpg" },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("Tümü");
  const [notice, setNotice] = useState("Popüler tesisleri inceleyin veya aramaya başlayın.");
  const visibleFacilities = useMemo(() => {
    const search = query.trim().toLocaleLowerCase("tr-TR");
    return facilities.filter((facility) => {
      const matchesCategory = category === "Tümü" || facility.type === category;
      const haystack = `${facility.name} ${facility.city} ${facility.district} ${facility.type}`.toLocaleLowerCase("tr-TR");
      return matchesCategory && (!search || haystack.includes(search));
    });
  }, [category, query]);
  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(query.trim() ? `“${query.trim()}” için uygun tesisler listeleniyor.` : "Tüm popüler tesisler listeleniyor.");
    document.getElementById("tesisler")?.scrollIntoView({ behavior: "smooth" });
  }
  function showNearby() {
    setNotice("Konum izniyle yakın tesisler burada sıralanacak. Şimdilik örnek tesisleri görüntülüyorsunuz.");
    document.getElementById("tesisler")?.scrollIntoView({ behavior: "smooth" });
  }
  const quickSearch = (value: string) => { setQuery(value); setNotice(`${value}’daki tesisler listeleniyor.`); document.getElementById("tesisler")?.scrollIntoView({ behavior: "smooth" }); };
  return <main>
    <header className="site-header">
      <a className="brand" href="#ana-sayfa" aria-label="Kamu Sosyal Tesisleri ana sayfa"><span className="brand-mark" aria-hidden="true">K</span><span>Kamu Sosyal<br /><strong>Tesisleri</strong></span></a>
      <nav aria-label="Ana menü"><a href="#tesisler">Tesisler</a><a href="#nasil-calisir">Nasıl çalışır?</a><a href="#guncel">Güncel bilgiler</a></nav>
      <a className="header-action" href="#tesisler">Tesis ara</a>
    </header>
    <section className="hero" id="ana-sayfa"><div className="hero-content">
      <p className="eyebrow"><span aria-hidden="true">●</span> Türkiye’nin kamu tesis rehberi</p>
      <h1>Yakınındaki tesisi<br /><em>kolayca bul.</em></h1>
      <p className="hero-copy">Öğretmenevi, polisevi, misafirhane ve orduevlerini şehir şehir karşılaştır. Telefon, konum ve güncel bilgi tek ekranda.</p>
      <form className="search-box" onSubmit={handleSearch}><label className="sr-only" htmlFor="facility-search">Tesis, il veya ilçe ara</label><span aria-hidden="true" className="search-icon">⌕</span><input id="facility-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tesis, il veya ilçe ara" /><button type="submit">Ara</button></form>
      <div className="quick-links" aria-label="Popüler aramalar"><span>Popüler:</span><button onClick={() => quickSearch("Ankara")}>Ankara</button><button onClick={() => quickSearch("İzmir")}>İzmir</button><button onClick={() => quickSearch("Antalya")}>Antalya</button></div>
    </div><aside className="hero-card" aria-label="Hızlı tesis bulma bilgisi"><div className="map-orb"><span>⌖</span></div><div className="route-line route-one" /><div className="route-line route-two" /><div className="floating-pin pin-one">⌖</div><div className="floating-pin pin-two">⌖</div><div className="nearby-card"><span className="card-icon">⌖</span><div><small>Konumuna göre</small><strong>Yakın tesisleri keşfet</strong></div><button type="button" onClick={showNearby} aria-label="Yakındaki tesisleri göster">→</button></div></aside></section>
    <section className="trust-strip" aria-label="Platform özellikleri"><div><strong>81</strong><span>şehirde tesis</span></div><div><strong>4</strong><span>tesis türü</span></div><div><strong>1 tık</strong><span>telefon ve yol tarifi</span></div><div><strong>Güncel</strong><span>bilgi tarihi görünür</span></div></section>
    <section className="cities-section" aria-labelledby="popular-cities-title"><p className="section-kicker">Şehirler</p><h2 id="popular-cities-title">Popüler Şehirler</h2><p className="cities-copy">En çok aranan illerdeki kamu tesislerini hemen keşfedin.</p><div className="city-grid">{cities.map((city) => <button className="city-card" key={city.name} style={{ backgroundImage: `url("${city.image}")` }} onClick={() => quickSearch(city.name)} aria-label={`${city.name} tesislerini keşfet — ${city.landmark}`}><span>{city.name}</span><small>{city.landmark}</small></button>)}</div></section>
    <section className="facilities-section" id="tesisler"><div className="section-heading"><div><p className="section-kicker">Hızlı keşif</p><h2>Aradığın tesise<br />hemen ulaş.</h2></div><button className="nearby-button" type="button" onClick={showNearby}>⌖ Bana yakın tesisler</button></div><div className="filter-row" aria-label="Tesis türü filtresi">{categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div><p className="result-note" aria-live="polite">{notice}</p><div className="facility-grid">{visibleFacilities.map((facility) => <article className="facility-card" key={facility.name}><div className="facility-visual"><span>{facility.city.slice(0, 1)}</span><p>{facility.city}<br /><small>{facility.district}</small></p></div><div className="facility-info"><div className="card-top"><span className="type-pill">{facility.type}</span>{facility.distance && <span className="distance">⌖ {facility.distance}</span>}</div><h3>{facility.name}</h3><p className="location">{facility.district}, {facility.city}</p><div className="tags">{facility.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="card-bottom"><div><strong>{facility.price}</strong><small>{facility.verified}</small></div><a href={`tel:${facility.phone.replaceAll(" ", "")}`} aria-label={`${facility.name} tesisini ara`}>Ara</a></div></div></article>)}</div>{visibleFacilities.length === 0 && <div className="empty-state">Bu aramaya uygun örnek tesis bulunamadı. Farklı bir şehir veya tesis türü deneyin.</div>}</section>
    <section className="how-section" id="nasil-calisir"><div className="how-intro"><p className="section-kicker">Kolay ve şeffaf</p><h2>Yolculuğun<br />daha rahat.</h2><p>İhtiyacın olan bilgiye, karmaşık ekranlar olmadan ulaşırsın.</p></div><ol><li><span>01</span><h3>Ara ve filtrele</h3><p>Şehir, ilçe veya tesis türüne göre seçenekleri daralt.</p></li><li><span>02</span><h3>Bilgileri karşılaştır</h3><p>Fiyat, kabul koşulları, imkânlar ve güncelleme tarihini gör.</p></li><li><span>03</span><h3>Hemen iletişime geç</h3><p>Telefon et veya yol tarifini aç; güncel müsaitliği tesisten teyit et.</p></li></ol></section>
    <section className="update-section" id="guncel"><div><p className="section-kicker">Güvenilir rehber</p><h2>Bilginin tarihi de<br />kendisi kadar önemli.</h2></div><p>Fiyatlar ve kabul koşulları değişebilir. Bu nedenle her tesiste kaynak ve son güncelleme bilgisini görünür tutmayı hedefliyoruz. Kesin bilgi için her zaman tesisle doğrudan görüşün.</p></section>
    <footer><a className="brand" href="#ana-sayfa"><span className="brand-mark" aria-hidden="true">K</span><span>Kamu Sosyal<br /><strong>Tesisleri</strong></span></a><p>Türkiye’de kamu konaklamasını daha kolay bulmanın yolu.</p><small>© 2026 Kamu Sosyal Tesisleri · Resmî bir kamu kurumu sitesi değildir.</small></footer>
  </main>;
}
