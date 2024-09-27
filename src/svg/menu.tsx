function Menu({ onClick }: { onClick: () => void }) {
  return (
    <svg width="20" height="20" viewBox="0 0 44 44" onClick={onClick}>
      <circle cx="7" cy="7" r="6" />
      <circle cx="22" cy="7" r="6" />
      <circle cx="37" cy="7" r="6" />
      <circle cx="7" cy="22" r="6" />
      <circle cx="22" cy="22" r="6" />
      <circle cx="37" cy="22" r="6" />
      <circle cx="7" cy="37" r="6" />
      <circle cx="22" cy="37" r="6" />
      <circle cx="37" cy="37" r="6" />
    </svg>
  );
}

export default Menu;
