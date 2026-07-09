type CardProps = {
  children: React.ReactNode;
};

export function Card({ children }: CardProps) {
  return <div className="ui-card">{children}</div>;
}