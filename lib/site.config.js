// Edit these before going live — every contact link on the site reads from here.
export const site = {
  name: "Code Molecule",
  domain: "codemolecule.com",
  // WhatsApp number in international format, digits only (e.g. 8801712345678)
  whatsapp: "8801768899941",
  whatsappDisplay: "+880 1768-899941",
  // Facebook page username, used for https://m.me/<username>
  messenger: "codemolecule",
  facebook: "https://www.facebook.com/codemolecule/",
  linkedin: "https://www.linkedin.com/company/codemolecule",
  instagram: "https://instagram.com/codemolecule",
  email: "codemoleculebd@gmail.com",
  // Toggle the 3D infinity symbol in the Services section
  // true = shows infinity on the left, honeycomb on the right
  // false = hides infinity, stream criss-crosses across centered honeycomb
  showInfinity: false,
};

export const whatsappLink = (text = "") => {
  const number = site.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
};

export const messengerLink = `https://m.me/${site.messenger}`;
