package com.eastdawn.dao.oracle;

import java.util.List;
import java.util.Map;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.eastdawn.dao.QiyeDao;
import com.eastdawn.po.QiyeUser;

@SuppressWarnings({"serial", "unchecked"})
public class QiyeDaoImpl extends SqlMapClientDaoSupport implements QiyeDao {

	public void updateById(QiyeUser qyUser) {
		// TODO Auto-generated method stub
		getSqlMapClientTemplate().update("qiyeMap.updateById", qyUser);
	}

	public void add(QiyeUser qyUser) {
		// TODO Auto-generated method stub
		getSqlMapClientTemplate().insert("qiyeMap.add", qyUser);
	}

	public void deleteUpdateById(QiyeUser qyUser) {
		// TODO Auto-generated method stub
		getSqlMapClientTemplate().update("qiyeMap.deleteUpdateById", qyUser);
	}

	public List<QiyeUser> queryQiyeByPage(Map queryMap) {
		// TODO Auto-generated method stub
		return getSqlMapClientTemplate().queryForList("qiyeMap.queryQiyeByPage", queryMap);
	}
	
	public QiyeUser getQiyeById(Long qiyeId){
		return (QiyeUser) getSqlMapClientTemplate().queryForObject("qiyeMap.getQiyeById", qiyeId);
	}
}