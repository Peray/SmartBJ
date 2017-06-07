package com.eastdawn.dao.oracle;

import java.util.List;
import java.util.Map;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.eastdawn.dao.FanKuiDao;
import com.eastdawn.po.FanKui;
import com.eastdawn.po.QiyeUser;

@SuppressWarnings({"serial", "unchecked"})
public class FanKuiDaoImpl extends SqlMapClientDaoSupport implements FanKuiDao {

	public void add(FanKui fk) {
		// TODO Auto-generated method stub
		getSqlMapClientTemplate().insert("fankuiMap.add", fk);
	}

	public List<FanKui> queryFKByPage(Map queryMap) {
		// TODO Auto-generated method stub
		return getSqlMapClientTemplate().queryForList("fankuiMap.queryFKByPage", queryMap);
	}
	
	public Long getFKCountByPage(Map queryMap) {
		return (Long) getSqlMapClientTemplate().queryForObject("fankuiMap.getFKCountByPage", queryMap);
	}
	
	public Long getFKById(Map queryMap) {
		return (Long) getSqlMapClientTemplate().queryForObject("fankuiMap.getFKById", queryMap);
	}
	
	public void deleteById(Long fkId) {
		getSqlMapClientTemplate().update("fankuiMap.deleteById", fkId);
	}
	public void updateById(FanKui fk) {
		// TODO Auto-generated method stub
		getSqlMapClientTemplate().update("fankuiMap.updateById", fk);
	}
}