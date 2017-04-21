package com.eastdawn.dao;

import java.util.List;
import java.util.Map;

import com.eastdawn.po.DataSelect;

public interface DataSelectDao {
	
	public DataSelect getDataSelectById(Long selectId);
	
	public  List<DataSelect> queryDataSelectByPage(Map queryMap);
	
    public Long getDataSelectCountByPage(Map queryMap);
    
	public void add(DataSelect dataSelect);
	
	public void deleteById(Long selectId);
	
	public void updateById(DataSelect dataSelect);
}
