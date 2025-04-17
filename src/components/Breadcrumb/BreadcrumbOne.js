import Link from "next/link";

export default function BreadcrumbOne({ title, links }) {
  return (
    <div className="breadcrumb-area position-relative">
      <div className="position-absolute top-50 start-50 translate-middle text-center">
        {/* {title && (
          <h3 className="page-name text-uppercase lh-1 mb-0">{title}</h3>
        )}
        <ul className="breadcrumb-area--list">
          {links.map((link, index) => (
            <li key={index} className="breadcrumb-area--item d-inline-block">
              {link.href === "#" ? (
                `${link.name}`
              ) : (
                <Link href={`${link.href}`} className="breadcrumb-area--link">
                  {link.name}
                </Link>
              )}
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
}
