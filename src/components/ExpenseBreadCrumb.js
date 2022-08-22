import { Breadcrumb } from "antd";
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

const ExpenseBreadCrumb = () => {
const breadcrumbs = useBreadcrumbs();
breadcrumbs.splice(0,1)

  return (
    <Breadcrumb separator="/">
     {breadcrumbs.map(({ breadcrumb, match }) => {
      return  <Breadcrumb.Item key={match.url}>
          <Link to={match.url || ""}><span className="crumb" >{breadcrumb}</span></Link>
        </Breadcrumb.Item>
})}

    </Breadcrumb>

  );
};

  export default ExpenseBreadCrumb