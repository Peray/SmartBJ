package com.eastdawn.dao;

import java.util.List;
import java.util.Map;

import com.eastdawn.po.FanKui;
import com.eastdawn.po.QiyeUser;

@SuppressWarnings("unchecked")
public interface FanKuiDao {

	public List<FanKui> queryFKByPage(Map queryMap);
	public void add(FanKui fk);
	public Long getFKCountByPage(Map queryMap);
	public void deleteById(Long fkId);
	public Long getFKById(Map queryMap);
	public void updateById(FanKui fk);

	
}
