

import React, { useEffect, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { UseFormValidations } from "../../../validations/UseFormValidation";
import { getList } from "../../../api_services/SharedServices";
import { urls } from "../../../api_services/url";


let treeData=[]
const TreeNode = ({ node, checkedNodes, setCheckedNodes, expandedNodes, setExpandedNodes }) => {
  const isChecked = (id) => checkedNodes.includes(id);
  const isIndeterminate = (node) => {
    if (!node?.child) return false;
    const childIds = node?.child?.map(child => child?.accessLinkId);
    const checkedChildIds = childIds?.filter(accessLinkId => checkedNodes?.includes(accessLinkId));
    return (
      checkedChildIds?.length > 0 && checkedChildIds?.length < childIds?.length
    );
  };

  const handleCheckChange = (accessLinkId, checked) => {
    const updateCheckState = (nodes, checked) => {
      const updatedNodes = [];
      for (const node of nodes) {
        if (checked) {
          if (!checkedNodes?.includes(node?.accessLinkId)) updatedNodes.push(node?.accessLinkId);
        } else {
          if (checkedNodes?.includes(node?.accessLinkId))
            updatedNodes?.push(node?.accessLinkId);
        }
        if (node?.child) {
          updatedNodes.push(...updateCheckState(node?.child, checked));
        }
      }
      return updatedNodes;
    };

    const newCheckedNodes = checked
      ? [...new Set([...checkedNodes, accessLinkId, ...updateCheckState([node], checked)])]
      : checkedNodes.filter(
          checkedId => checkedId !== accessLinkId && !updateCheckState([node], checked).includes(checkedId)
        );

    // Update the state with the new checked nodes
    setCheckedNodes(newCheckedNodes);
    updateParentCheckState(node, newCheckedNodes);
  };

  const updateParentCheckState = (node, currentCheckedNodes) => {
    const parent = findParent(node?.accessLinkId, treeData);
    if (!parent) return;

    const allChildrenChecked = parent?.child?.every(child => currentCheckedNodes.includes(child.accessLinkId) || allDescendantsChecked(child, currentCheckedNodes));
    const parentIdIndex = currentCheckedNodes?.indexOf(parent?.accessLinkId);

    if (allChildrenChecked && parentIdIndex === -1) {
      setCheckedNodes(prevChecked => [...prevChecked, parent?.accessLinkId]);
      updateParentCheckState(parent, [...currentCheckedNodes, parent?.accessLinkId]);
    } else if (!allChildrenChecked && parentIdIndex > -1) {
      setCheckedNodes(prevChecked => prevChecked.filter(accessLinkId => accessLinkId !== parent?.accessLinkId));
      updateParentCheckState(parent, currentCheckedNodes.filter(accessLinkId => accessLinkId !== parent?.accessLinkId));
    }
  };

  const allDescendantsChecked = (node, currentCheckedNodes) => {
    if (!node?.child) return currentCheckedNodes.includes(node.accessLinkId);
    return node?.children?.every(child => currentCheckedNodes.includes(child.accessLinkId) || allDescendantsChecked(child, currentCheckedNodes));
  };

  const findParent = (accessLinkId, nodes) => {
    for (const node of nodes) {
      if (node?.child) {
        if (node?.child.some(child => child?.accessLinkId === accessLinkId)) {
          return node;
        }
        const parent = findParent(accessLinkId, node?.child);
        if (parent) return parent;
      }
    }
    return null;
  };

  const toggleExpand = (accessLinkId) => {
    setExpandedNodes(prevState => (
      prevState.includes(accessLinkId) ? prevState.filter(expandedId => expandedId !== accessLinkId) : [...prevState, accessLinkId]
    ));
  };

  const isExpanded = expandedNodes.includes(node?.accessLinkId);

  return (
    <div style={{marginLeft:"20px"}}>
      
      <div className="d-flex ">
        <div className={"col-md-1 m-1  d-flex justify-content-center"}>
        {node.child && (
          <button className="btn border  col-auto" onClick={() => toggleExpand(node?.accessLinkId)}>
            {isExpanded ? '-' : '+'}
          </button>
        )}
        </div>
        <div class="form-check col-auto mt-2">
          <input
            type="checkbox"
            class="form-check-input"
            checked={isChecked(node.accessLinkId)}
            indeterminate={isIndeterminate(node)}
            onChange={(e) => handleCheckChange(node.accessLinkId, e.target.checked)}
            id={node?.accessLinkId}
          />
          <label class="form-check-label" for={node?.accessLinkId}>{node.linkName}</label>
        </div>
      </div>
      {isExpanded && node?.child && (
        <div>
          {node?.child?.map(child => (
            <TreeNode
              key={child.accessLinkId}
              node={child}
              checkedNodes={checkedNodes}
              setCheckedNodes={setCheckedNodes}
              expandedNodes={expandedNodes}
              setExpandedNodes={setExpandedNodes}
            />
          ))}
        </div>
      )}
    </div>
  );
};
const UpdateUserAccessLevel = () => { 

  const navigate = useNavigate();
  const {userId}=useParams()
const [accessList,setaccessList]=useState([])
const getAllAccessLink=async()=>{
  let jsonObjects={
    subscriptionId:2,
    subscriptionName:"",
    roleId:0,
    price:0
  }
  let res=await getList(urls?.accessLevel?.getallLink,jsonObjects)
  treeData=res
  setaccessList(res)
}

  const { data, addObject, headerlink} = UseFormValidations({
    // submit: submit,
  });





  const [checkedNodes, setCheckedNodes] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState([]);

  useEffect(() => {
    const initialCheckedNodes = [];
    const collectCheckedNodes = (nodes) => {
      for (const node of nodes) {
        initialCheckedNodes.push(node.accessLinkId);
        if (node.child) {
          collectCheckedNodes(node.child);
        }
      }
    };
    collectCheckedNodes(treeData);
    setCheckedNodes(initialCheckedNodes);
    
  }, [accessList]);






  
  useEffect(() => {
    headerlink([
      {
        name: "Access Level",
        link: "/outpatientpro/enterprise/accesslevel/all",
        active: true,
      },
      {
        name: "Update Access Level",
        link: "/outpatientpro/enterprise/accesslevel/all",
        active: true,
      },
    ]);
    getAllAccessLink()
  }, [userId]);
  console?.log(treeData,"treeData")



  return (
    <div >
      
      <div className="mainpanel bg-white rounded pb-4">
        <div className="d-flex px-4 justify-content-between ">
          <h4 className=" d-flex  align-items-center mt-3"style={{color:"#34A56F"}}>Update User Access Level</h4>
          <div className="d-flex justify-content-between align-items-center gap-2  mt-3">
          <button className="border  btn " onClick={()=>navigate("/outpatientpro/facility/accesslevel")} >
                Cancel
              </button>
          <button className="border  text-white btn  " 
          style={{background:"#00B948"}}
        
          >
                Save
              </button>
          </div>
         
          
        </div>
        <hr/>
        
        <div>
      {treeData.map(node => (
        <TreeNode
          key={node.id}
          node={node}
          checkedNodes={checkedNodes}
          setCheckedNodes={setCheckedNodes}
          expandedNodes={expandedNodes}
          setExpandedNodes={setExpandedNodes}
        />
      ))}
    </div>
      </div>
    </div>
  );
};

export default UpdateUserAccessLevel




