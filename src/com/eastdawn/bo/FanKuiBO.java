package com.eastdawn.bo;

import java.io.Serializable;
import com.eastdawn.po.FanKui;

public interface FanKuiBO extends Serializable  {
	public Long add(FanKui fk);
	public void updateById(FanKui fk);
}