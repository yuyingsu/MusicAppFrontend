import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from "react-router-dom";

const Sidebar = () => {
return (
<ProSidebar>
  <Menu iconShape="square">
    <MenuItem>
    Dashboard
    <Link to="/profile"/>
    </MenuItem>
    <SubMenu title="My Activity">
      <MenuItem>
      My Lists
      <Link to="/mylists"/>
      </MenuItem>
      <MenuItem>
      My Events
      <Link to="/myevents"/>
      </MenuItem>
      <MenuItem>
      My Likes
      <Link to="/mylikes"/>
      </MenuItem>
    </SubMenu>
    <MenuItem>
    Create New List
    <Link to="/createlist"/>
    </MenuItem>
    <MenuItem>
    Host New Event
    <Link to="/hostevent"/>
    </MenuItem>
  </Menu>
</ProSidebar>
)
}
export default Sidebar;