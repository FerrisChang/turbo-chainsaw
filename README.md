package gov.dhs.cbp.cspd.tv.mapper;

import org.apache.ibats.annotations.Insert;
import org.apache.ibats.annotations.Mapper;
import org.apache.ibats.annotations.Select;

import gov.dhs.cbp.cspd.tv.model.VcidStatus;

import java.util.List;

@Mapper
public interface VCMapper {
  
  @Select("SELECT nextval('vcid_status_id_seq')")
  long getNextVcidStatusId();

  @Select({
    "SELECT vcid_status_id, vcid, status, create_dttm, status_cd",
    "FROM trace_vocab.vcid_status",
    "WHERE vcid = #{vcid}"
  })
  List<VcidStatus> selectVcidStatuses(String vcid);

  @Select({
    "SELECT vcid_status_id, vcid, status, create_dttm, status_cd",
    "FROM trace_vocab.vcid_status",
    "ORDER BY create_dttm DESC"
  })
  List<VcidStatus> selectAllVcidStatuses();

  @Insert({
    "INSERT INTO trace_vocab.vcid_status (vcid_status_id, vcid, status, create_dttm, status_cd)",
    "VALUES (#{vcidStatusId, jdbcType=BIGINT}, #{vcid, jdbcType=VARCHAR},",
    "#{status, jdbcType=VARCHAR}, #{createDttm, jdbcType=TIMESTAMP}, ",
    "#{statusCd, jdbcType=VARCHAR})"
  })
  int insertVcidStatus(VcidStatus row);
} 
