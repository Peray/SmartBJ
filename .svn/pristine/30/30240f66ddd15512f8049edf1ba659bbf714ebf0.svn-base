package  com.eastdawn.dao.oracle;

import java.util.List;
import java.util.Map;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.eastdawn.dao.DataSelectDao;
import com.eastdawn.po.DataSelect;

public class DataSelectDaoImpl extends SqlMapClientDaoSupport implements DataSelectDao{
	
	public DataSelect getDataSelectById(Long selectId){
		return (DataSelect) getSqlMapClientTemplate().queryForObject("dataSelectMap.getDataSelectById", selectId);
	}
	
	public List queryDataSelectByPage(Map queryMap) {
		// TODO Auto-generated method stub
		return (List)getSqlMapClientTemplate().queryForList("dataSelectMap.queryDataSelectByPage", queryMap);
	}

	public Long getDataSelectCountByPage(Map queryMap) {
		// TODO Auto-generated method stub
		return (Long)getSqlMapClientTemplate().queryForObject("dataSelectMap.getDataSelectCountByPage", queryMap);
	}
	
	public void add(DataSelect dataSelect) {
		 getSqlMapClientTemplate().insert("dataSelectMap.add", dataSelect);
	}
	
	public void deleteById(Long selectId) {
		// TODO Auto-generated method stub
		getSqlMapClientTemplate().update("dataSelectMap.deleteById", selectId);

	}
	
	public void updateById(DataSelect dataSelect) {
		// TODO Auto-generated method stub
		getSqlMapClientTemplate().update("dataSelectMap.updateById", dataSelect);

	}

}
