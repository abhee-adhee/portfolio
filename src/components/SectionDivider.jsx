export default function SectionDivider({ label = 'END_OF_SEGMENT' }) {
  return (
    <div className="section-divider">
      <span>◈</span>
      <span>———</span>
      <span>{label}</span>
      <span>———</span>
      <span>◈</span>
    </div>
  );
}
