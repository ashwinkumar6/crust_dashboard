import React from "react";
import { Icon } from "antd";

import './tableColumn.css';
import { PROTOCOL, NatType } from "../../redux/FilterTypes";

const columns = [
  {
    title: "#",
    dataIndex: "num",
    key: "num",
    align: 'center',
    //defaultSortOrder: 'ascend',
    // sorter: (a, b) => a.num - b.num,
    render: (a, b) => {
      return (
        <table>
          <tbody style={{ padding: 0, textAlign: 'center' }}>
            <tr>
              <td>
                {!b.isSuccessful ? (
                  <Icon type="disconnect" style={{ fontSize: 24, color: "red" }} />
                ) : (
                    <Icon type="check-circle" theme="filled" style={{ fontSize: 24, color: "#52c41a" }} />
                  )}
              </td>
              <td>{a}</td>
            </tr>
          </tbody>
        </table>
      );
    }
  },
  {
    title: "TCP HP",
    dataIndex: "tcp_hp",
    key: "tcp_hp",
    className: 'tcp',
    align: 'center',
    render: text => {
      return (
        <table>
          <tbody style={{ padding: 0, textAlign: 'center' }}>
            <tr>
              <td>
                {text === "Fail" ? (
                  <Icon
                    type="close-circle"
                    theme="twoTone"
                    twoToneColor="red"
                  />
                ) : (
                    <Icon
                      type="check-circle"
                      theme="twoTone"
                      twoToneColor="#52c41a"
                    />
                  )}
              </td>
            </tr>
            <tr>
              <td>{text}</td>
            </tr>
          </tbody>
        </table>
      );
    }
  },
  {
    title: "UDP HP",
    dataIndex: "udp_hp",
    key: "udp_hp",
    align: 'center',
    className: 'udp',
    // filters: [
    //   { text: 'Male', value: 'male' },
    //   { text: 'Female', value: 'female' },
    // ],
    render: text => {
      return (
        <table>
          <tbody style={{ padding: 0, textAlign: 'center' }}>
            <tr>
              <td>
                {text === "Fail" ? (
                  <Icon
                    type="close-circle"
                    theme="twoTone"
                    twoToneColor="red"
                  />
                ) : (
                    <Icon
                      type="check-circle"
                      theme="twoTone"
                      twoToneColor="#52c41a"
                    />
                  )}
              </td>
            </tr>
            <tr>
              <td>{text}</td>
            </tr>
          </tbody>
        </table>
      );
    }
  },
  {
    title: "Direct",
    dataIndex: "direct",
    key: "direct",
    align: 'center',
    className: 'direct',
    render: text => {
      return (
        <table>
          <tbody style={{ padding: 0, textAlign: 'center', marginLeft: "1px solid #999" }}>
            <tr>
              <td>
                {text === "Yes" ? (
                  <Icon
                    type="check-circle"
                    theme="twoTone"
                    twoToneColor="#52c41a"
                  />
                ) : (
                    <Icon
                      type="close-circle"
                      theme="twoTone"
                      twoToneColor="red"
                    />
                  )}
              </td>
            </tr>
            <tr>
              <td>{text}</td>
            </tr>
          </tbody>
        </table>
      );
    }
  },
  {
    title: "",
    dataIndex: "publicId",
    key: "publicId",
    render: text => {
      return (
        <table>
          <tbody style={{ padding: 10, color: '#ccc' }}>
            <tr>
            <td title={text[0]} className="truncate-public-id">{text[0]}</td>
            </tr>
            <hr />
            <tr>
            <td title={text[1]} className="truncate-public-id">{text[1]}</td>
            </tr>
          </tbody>
        </table>
      );
    }
  },
  {
    title: "NAT Type",
    dataIndex: "nat_type",
    key: "nat_type",
    render: text => {
      return (
        <table>
          <tbody>
            <tr>
              <td>{text[0] === NatType.EDM_RANDOM ? "EDM Random" : text[0]}</td>
            </tr>
            <hr />
            <tr>
              <td>{text[1] === NatType.EDM_RANDOM ? "EDM Random" : text[1]}</td>
            </tr>
          </tbody>
        </table>
      );
    }
  },
  {
    title: "Operating System",
    dataIndex: "os",
    key: "os",
    // filters: [
    //   { text: "Mac OS", value: "MacOS" },
    //   { text: "Windows", value: "Windows" },
    //   { text: "Linux", value: "Linux" }
    // ],
    render: text => {
      return (
        <table>
          <tbody>
            <tr>
              <td>{text[0]}</td>
            </tr>
            <hr />
            <tr>
              <td>{text[1]}</td>
            </tr>
          </tbody>
        </table>
      );
    }
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
    // sorter: (a, b) => a.country.length - b.country.length,
    render: text => {
      return (
        <table>
          <tbody>
            <tr>
              <td>{text[0]}</td>
            </tr>
            <hr />
            <tr>
              <td>{text[1]}</td>
            </tr>
          </tbody>
        </table>
      );
    }
  }
];

export default columns;
