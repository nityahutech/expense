import { Breadcrumb } from "antd";
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

const ExpenseBreadCrumb = () => {
const breadcrumbs = useBreadcrumbs();


  return (

    <Breadcrumb separator=">">
     {breadcrumbs.map(({ breadcrumb, match }) => (

        <Breadcrumb.Item key={match.url}>
          <Link to={match.url || ""}>{breadcrumb}</Link>
        </Breadcrumb.Item>
      ))}

    </Breadcrumb>

  );
};

  export default ExpenseBreadCrumb