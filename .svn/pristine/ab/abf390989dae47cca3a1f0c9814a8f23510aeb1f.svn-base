package com.eastdawn.action;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;


import com.eastdawn.bo.DataSelectBO;
import com.eastdawn.common.PageAction;
import com.eastdawn.common.PageUtil;
import com.eastdawn.dao.DataSelectDao;
import com.eastdawn.po.DataSelect;

public class DataSelectAction extends PageAction{
	
	private Long selectId;//数据选项ID
	private String selectName;//选项名称
	private Long itemOrder;//排序
	private Long parentId;//父类ID
	private List selectList;
	private DataSelectDao dataSelectDao;
	private DataSelectBO dataSelectBO;
	private DataSelect dataSelect;
	
	
	//类别添加方法
	public String add() throws Exception {
		DataSelect dataSelect = new DataSelect();
		try {
			dataSelect.setSelectName(this.selectName);
			dataSelect.setItemOrder(this.itemOrder);
			dataSelect.setParentId(this.selectId);

			this.selectId = dataSelectBO.add(dataSelect);
			selectId = null;
			this.execute();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	    return null;
	}
	
	//类别添加方法
	public String beforeAdd() throws Exception {
	    return "add";
	}
	
	//类别查询方法
	public String execute() throws Exception {
		HttpSession session = ServletActionContext.getRequest().getSession();
		HttpServletResponse iResponse =ServletActionContext.getResponse();
		Map queryMap = new HashMap();
		if(this.selectId == null || this.selectId.equals("")){
		    queryMap.put("parentIsNull", true);
		} else {
			queryMap.put("parentId", selectId);
			System.out.println(selectId);
		}
		System.out.println(selectId);
		super.totalNum = dataSelectDao.getDataSelectCountByPage(queryMap);
		super.totalPage = super.getTotalPage();
		queryMap.put(PageUtil.NUM_START, super.getNumStart());
		queryMap.put(PageUtil.NUM_END, super.getNumEnd());
		
		selectList = dataSelectDao.queryDataSelectByPage(queryMap); 
		
		JSONObject object = new JSONObject();  
        object.put("list", selectList); 
        System.out.println(object.toString());
        iResponse.setCharacterEncoding("utf-8");
        iResponse.getWriter().write(object.toString());

		return null;	
	}

	//修改方法
	public String edit() throws ParseException{
		HttpServletRequest request = ServletActionContext.getRequest();	
        Map queryMap = new HashMap();
        queryMap.put("selectId", selectId);
        dataSelect = dataSelectDao.getDataSelectById(selectId);
		return "edit";
	}
	
	//更新
	public String update() throws Exception{

		DataSelect dataSelect = new DataSelect();	
		dataSelect.setSelectId(getSelectId());
		dataSelect.setSelectName(getSelectName());
		dataSelect.setItemOrder(getItemOrder());
		dataSelectBO.updateById(dataSelect);
		
		selectId = null;
		this.execute();
		return null;
	}
	
	//删除
	public String delete() throws Exception{
		System.out.println("Start to execute delete Action!");
		System.out.println(getSelectId());
		HttpServletRequest request = ServletActionContext.getRequest();
		try {
			selectId = Long.parseLong(request.getParameter("selectId"));
			dataSelectDao.deleteById(selectId);
		} catch (Exception e) {
			e.printStackTrace();
			super.addActionMessage("删除失败!请先将该类下级类别或文件删除！");
		}
		selectId = null;
		this.execute();
		
		return null;
	}
	

	public Long getSelectId() {
		return selectId;
	}

	public void setSelectId(Long selectId) {
		this.selectId = selectId;
	}

	public String getSelectName() {
		return selectName;
	}

	public void setSelectName(String selectName) {
		this.selectName = selectName;
	}

	public Long getItemOrder() {
		return itemOrder;
	}

	public void setItemOrder(Long itemOrder) {
		this.itemOrder = itemOrder;
	}

	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	public List getSelectList() {
		return selectList;
	}

	public void setSelectList(List selectList) {
		this.selectList = selectList;
	}

	public DataSelectDao getDataSelectDao() {
		return dataSelectDao;
	}

	public void setDataSelectDao(DataSelectDao dataSelectDao) {
		this.dataSelectDao = dataSelectDao;
	}

	public DataSelectBO getDataSelectBO() {
		return dataSelectBO;
	}

	public void setDataSelectBO(DataSelectBO dataSelectBO) {
		this.dataSelectBO = dataSelectBO;
	}

	public DataSelect getDataSelect() {
		return dataSelect;
	}

	public void setDataSelect(DataSelect dataSelect) {
		this.dataSelect = dataSelect;
	}
}