export default function SlideWrapper({ children, ...rest }) {
  return <div className="slide" {...rest}>{children}</div>
}
