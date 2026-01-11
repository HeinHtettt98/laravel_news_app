import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { FaSort } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NewsSortingComponents = () => {
  const nav = useNavigate();
  return (
    <div>
      <Menu>
        <MenuButton as={Button} colorScheme="blue" rightIcon={<FaSort />}>
          Actions
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => nav("/user/manage-posts?sort_dir=asc")}>
            Sort by asc
          </MenuItem>
          <MenuItem onClick={() => nav("/user/manage-posts?sort_dir=desc")}>Sort by desc</MenuItem>
          <MenuItem>Mark as Draft</MenuItem>
          {/* <MenuItem>Delete</MenuItem> */}
          <MenuItem>Attend a Workshop</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default NewsSortingComponents;
