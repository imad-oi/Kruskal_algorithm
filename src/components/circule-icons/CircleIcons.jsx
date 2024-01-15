import "./cirucle-icons.css";

export default function CircleIcons() {
  return <>
    <ul id="menu">
      <a className="menu-button icon-plus" id="open-menu" title="Show navigation"></a>
      <a className="menu-button icon-minus" title="Hide navigation"></a>
      <li className="menu-item">
        <a>
          <span className="fa fa-github"></span>
        </a>
      </li>
      <li className="menu-item">
        <a>
          <span className="fa fa-linkedin"></span>
        </a>
      </li>
      <li className="menu-item">
        <a>
          <span className="fa fa-instagram"></span>
        </a>
      </li>
      <li className="menu-item">
        <a>
          <span className="fa fa-twitter"></span>
        </a>
      </li>
    </ul>
  </>;
}
