// Header component — displays app branding and live task statistics

function Header({ total, completed }) {
  return (
    <header className="app-header">
      <div className="header-inner">

        {/* Brand */}
        <div className="header-brand">
          <div className="header-logo">✓</div>
          <div>
            <div className="header-title">TaskFlow</div>
            <div className="header-subtitle">Stay organised, stay focused</div>
          </div>
        </div>

        {/* Live stats */}
        <div className="header-stats">
          <div className="stat-pill">
            <span className="stat-num">{total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-pill">
            <span className="stat-num done">{completed}</span>
            <span className="stat-label">Done</span>
          </div>
          <div className="stat-pill">
            <span className="stat-num">{total - completed}</span>
            <span className="stat-label">Left</span>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Header;
