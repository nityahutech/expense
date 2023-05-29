import { Badge, Card, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";

const Notifications = (props) => {
  const navigate = useNavigate();

  return (
    <div style={{ overflowY: "auto", height: props.height }}>
      {props.notifications.map((x) => {
        console.log(x);
        if (x == null) {
          return;
        }
        return (
          <Card
            className="notification"
            bordered
            hoverable
            style={{ height: "auto", padding: "10px" }}
            onClick={() => {
              if (x.ref) {
                navigate(x.ref[0], x.ref[1] || {});
              }
            }}
          >
            {/* <Card.Meta
                        avatar={<AlertTwoTone twoToneColor="#fa8128" style={{fontSize: "20px"}} />}
                        title={<h5>Leave Notification</h5>}
                        // description=""
                        extra={<Badge count={3} />}
                      /> */}
            {/* This is the description */}
            <Row style={{ height: "auto", padding: "0" }}>
              <Col span={2}>{x.icon}</Col>
              <Col span={20}>
                <h4 style={{ margin: 0 }}>{x.name}</h4>
                {x.description ? (
                  <p
                    style={{
                      margin: "0",
                      marginLeft: "5px",
                      color: "lightgray",
                    }}
                  >
                    {x.description}
                  </p>
                ) : null}
              </Col>
              <Col span={2}>
                <Badge count={x.badge} />
              </Col>
            </Row>
          </Card>
        );
      })}
    </div>
  );
};

export default Notifications;
