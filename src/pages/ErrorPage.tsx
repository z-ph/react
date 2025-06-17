import { Result } from 'antd';
import Nav from '../components/Nav';
export default function ErrorPage() {
    return (
      <>
        <Nav title="404" />
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          //   extra={<Button type="primary">Back Home</Button>}
        />
      </>
    );
}