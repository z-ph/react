export interface OrderInfo {
  title: string;
  content: string;
}
export default function InfoCard(props: {
  title: string;
  infoList?: OrderInfo[];
  children?: React.ReactElement | React.ReactElement[];
}) {
  const infoList = props.infoList || [];
  return (
    <div className="p-4 ">
      <h3 className="text-xl font-bold">{props.title}</h3>
      {infoList.map((item, index) => (
        <div key={index} className="flex justify-between my-[1rem]">
          <div className="title text-gray-600">{item.title}:</div>
          <div className="content">{item.content}</div>
        </div>
      ))}
      {props.children}
    </div>
  );
}
