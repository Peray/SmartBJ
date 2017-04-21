package com.eastdawn.po;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("serial")
public class DataSelect implements Serializable {
	
	private Long selectId;//数据选项ID
	private String selectName;//选项名称
	private Long itemOrder;//字典表排序
	private Long parentId;//父类ID
	
	private List<DataSelect> selectList = new ArrayList<DataSelect>();
	
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
	public List<DataSelect> getSelectList() {
		return selectList;
	}
	public void setSelectList(List<DataSelect> selectList) {
		this.selectList = selectList;
	}
}
