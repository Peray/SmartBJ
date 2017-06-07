package com.eastdawn.action;

import java.io.IOException;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import net.sf.json.JSONObject;

import com.eastdawn.util.PropertiesUtil;
import com.mysql.jdbc.Connection;
import com.mysql.jdbc.ResultSetMetaData;
import com.mysql.jdbc.Statement;

public class POIConnection {
	private Integer statr;
	private Integer numStart;
	private String keyword;
	private String number;
    public String searchPOI() throws IOException{
            //调用Class.forName()方法加载驱动程序
		HttpServletResponse iResponse =ServletActionContext.getResponse();
    	System.out.println(statr+ keyword);
    	try {
    		Properties properties = PropertiesUtil.getProperties("/config/config.properties");
    		String myjdbc = properties.getProperty("mysqljdbc");
    		String driver = "com.mysql.jdbc.Driver";
    		String url = myjdbc;
    		Connection con = null;
    		
			Class.forName(driver);
			System.out.println("成功加载MySQL驱动！");
			con = (Connection) DriverManager.getConnection(url, "root","123456");
			Statement stmt = (Statement) con.createStatement();
			System.out.println("链接成功！");
			String num = "select count(ID) as counta from poi where 1=1 and name like '%" + keyword + "%' or address like '%" + keyword + "%' or tag like '%" +keyword+ "%'"; 
			System.out.println(num);
			ResultSet rsnum = stmt.executeQuery(num); 
			while(rsnum.next()){
				number =rsnum.getString("counta");
				System.out.println(number);
			}
			if(statr == 1){
				numStart = 0;
			}else{
				numStart = (statr-1) * 10;
			}
			String sql = "select t.ID,t.NAME,t.address,t.tag,SUBSTRING_INDEX(tag, ';',1) AS typeimg,t.street_number,t.lng,t.lat from poi as t where (t.name like '%" + keyword + "%' or t.address like '%" + keyword + "%' or tag like '%" +keyword+ "%')order by((case when t.name like '" +keyword+ "%' then 3 else 0 end) + (case when t.name like '%" +keyword+ "%' then 1 else 0 end)) desc,t.name desc  LIMIT "+numStart+",10";    //要执行的SQL
			System.out.println(sql);
			ResultSet rs = stmt.executeQuery(sql);//创建数据对象
            ResultSetMetaData md = (ResultSetMetaData) rs.getMetaData(); //得到结果集(rs)的结构信息，比如字段数、字段名等   
            int columnCount = md.getColumnCount(); //返回此 ResultSet 对象中的列数   
            List list = new ArrayList();   
            Map rowData = new HashMap();   
            while (rs.next()) {   
            	rowData = new HashMap(columnCount);   
            	for (int i = 1; i <= columnCount; i++) {   
                    rowData.put(md.getColumnName(i), rs.getObject(i));   
            	}
            list.add(rowData);
            System.out.println("list:" + list.toString());  
            }   
            JSONObject object = new JSONObject();  
	        object.put("num", number); 
	        object.put("list", list); 
	        System.out.println(number+object.toString());
	        iResponse.setCharacterEncoding("utf-8");
	        iResponse.getWriter().write(object.toString());
	        
            System.out.println(list.size());
            rs.close();
            stmt.close();
            con.close();
                
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			  System.err.println("装载 JDBC/ODBC 驱动程序失败。" );  
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.err.println("无法连接数据库" ); 
			e.printStackTrace();
		}
		return null;
    }
	public String getKeyword() {
		return keyword;
	}
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public Integer getNumStart() {
		return numStart;
	}
	public void setNumStart(Integer numStart) {
		this.numStart = numStart;
	}
	public Integer getStatr() {
		return statr;
	}
	public void setStatr(Integer statr) {
		this.statr = statr;
	}
}