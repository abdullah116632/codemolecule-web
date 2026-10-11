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
  instagram: "https://www.instagram.com/codemoleculebd/",
  email: "codemoleculebd@gmail.com",
  location: "Dhaka, Bangladesh",
  locationBn: "ঢাকা, বাংলাদেশ",
};

export const whatsappLink = (text = "") => {
  const number = site.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
};

export const messengerLink = `https://m.me/${site.messenger}`;
