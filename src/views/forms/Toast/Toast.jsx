<CSSTransition
  in={toastVisible}
  timeout={300}
  classNames="toast-slide"
  unmountOnExit
>
  <div
    className="custom-toast"
    style={{ backgroundColor: toastBgColor }}
  >
    {toastMessage}
  </div>
</CSSTransition>