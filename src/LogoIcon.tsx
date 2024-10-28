import { useState } from "react";

const logoSize = "48px";

export const LogoIcon = ({ logo }: { logo: string }) => {
  const [isImageLoadError, setIsImageLoadError] = useState(false);

  return (
    <button
      style={{
        padding: "16px",
        border: 0,
        backgroundColor: "#fff",
        margin: "8px",
        display: "grid",
        gridTemplateRows: "1fr",
        justifyItems: "center",
        alignItems: "center",
        borderRadius: "8px",
        cursor: "pointer",
        width: "150px",
        height: "150px",
        boxShadow:
          "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
      }}
    >
      <div
        style={{
          position: "relative",
          width: logoSize,
          height: logoSize,
        }}
      >
        {isImageLoadError ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              width: "100%",
              height: "100%",
              borderRadius: "8px",
              backgroundColor: "#eaebf7",
            }}
          >
            <h2>{logo.charAt(0).toUpperCase()}</h2>
          </div>
        ) : (
          <img
            loading="lazy"
            alt={logo}
            style={{
              display: isImageLoadError ? "none" : "block",
              position: "absolute",
              top: 0,
              left: 0,
              outline: "1px solid #eaebf7",
              borderRadius: "8px",
            }}
            onError={() => setIsImageLoadError(true)}
            width={logoSize}
            height={logoSize}
            src={`https://logo-icons-lookup-api.deno.dev/lookup_logo_icon?logoIconName=${logo}`}
          />
        )}
      </div>
      <span>{logo}</span>
    </button>
  );
};
