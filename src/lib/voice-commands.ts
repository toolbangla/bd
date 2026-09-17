export type VoiceCommand = {
  route: string;
  label: string;
  aliases: string[];
};

export const VOICE_COMMANDS: VoiceCommand[] = [
  { route: "/", label: "Home", aliases: ["হোমে যাও", "হোম", "go home", "home"] },
  { route: "/tools", label: "Tools", aliases: ["টুলস পেজে যাও", "টুলস", "open tools", "tools page"] },
  { route: "/premium", label: "Premium", aliases: ["প্রিমিয়ামে যাও", "প্রিমিয়াম", "open premium", "premium mode"] },
  { route: "/history", label: "History", aliases: ["হিস্টোরিতে যাও", "হিস্টোরি", "open history", "history page"] },
  { route: "/tools/age-calculator", label: "Age Calculator", aliases: ["এজ ক্যালকুলেটর খুলো", "বয়স হিসাব করতে চাই", "বয়স ক্যালকুলেটর", "open age calculator", "age calculator"] },
  { route: "/tools/bmi-calculator", label: "BMI Calculator", aliases: ["বিএমআই ক্যালকুলেটর খুলো", "আমার BMI বের করবো", "বিএমআই", "open bmi calculator", "bmi calculator"] },
  { route: "/tools/percentage-calculator", label: "Percentage Calculator", aliases: ["পার্সেন্টেজ ক্যালকুলেটর খুলো", "শতাংশ হিসাব", "শতকরা হিসাব", "open percentage calculator", "percentage calculator"] },
  { route: "/tools/unit-converter", label: "Unit Converter", aliases: ["ইউনিট কনভার্টার খুলো", "একক রূপান্তর", "open unit converter", "unit converter"] },
  { route: "/tools/jpg-to-png", label: "JPG to PNG", aliases: ["জেপিজি টু পিএনজি খুলো", "open jpg to png", "jpg to png"] },
  { route: "/tools/pdf-to-jpg", label: "PDF to JPG", aliases: ["পিডিএফ টু জেপিজি খুলো", "open pdf to jpg", "pdf to jpg"] },
  { route: "/tools/qr-code-generator", label: "QR Code Generator", aliases: ["কিউআর কোড জেনারেটর খুলো", "QR code বানাবো", "qr code বানাবো", "open qr code generator", "qr code generator"] },
  { route: "/tools/background-remover", label: "Background Remover", aliases: ["ব্যাকগ্রাউন্ড রিমুভার খুলো", "ছবির background remove করবো", "background remove", "open background remover"] },
  { route: "/contact", label: "Contact", aliases: ["কন্টাক্ট পেজে যাও", "যোগাযোগ পেজে যাও", "go to contact", "open contact", "contact page"] },
];

function normalize(value: string) {
  return value.toLocaleLowerCase().replace(/[।?!,]/g, " ").replace(/\s+/g, " ").trim();
}

export function matchVoiceCommand(transcript: string) {
  const normalized = normalize(transcript);
  return VOICE_COMMANDS.find((command) => command.aliases.some((alias) => {
    const normalizedAlias = normalize(alias);
    return normalized === normalizedAlias || normalized.includes(normalizedAlias) || normalizedAlias.includes(normalized);
  }));
}
