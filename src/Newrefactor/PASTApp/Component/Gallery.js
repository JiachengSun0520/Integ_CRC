import * as React from "react";
import { useMemo, useEffect } from "react";
import Story from "./Story";
import TablePagination from "@mui/material/TablePagination";
import "./styles.css";
import { Button, Box, Stack,Grid } from "@mui/material";
import TocIcon from "@mui/icons-material/Toc";

export default function Gallery(props) {
  const {
    dataList,
    dataset,
    filter_object,
    pageType,
    setSelectedData,
    handleDialogOpen,
    handleGallery,
    pagination,
    setPagination,
  } = props.state;
  console.log(dataList)

  const gallery = useMemo(()=>{
    const oldGallery = [];
    //console.log("gData", gData)
    dataList.forEach((item) => {
      oldGallery.push(
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Story
            target={item}
            dynamic={true}
            remoteControl={handleDialogOpen}
            dataChange={setSelectedData}
            slavery={pageType}
          />
        </Grid>
      );
    });
    return oldGallery
  }, [dataList])

  const toolBarColor = useMemo(() => {
    if (pageType === "enslaver") {
      return "success";
    }
    if (dataset === "0") {
      return "primary";
    } else {
      return "secondary";
    }
  }, [pageType, dataset]);

  return (
    <div className="storybackground" margintop={{ xs: 2, md: 2, lg: 4 }}>
      {/* <Stack direction="row"> */}
      <Grid container spacing={2}>
        <Grid item xs={8}>
        <Button
          color={toolBarColor}
          variant="contained"
          startIcon={<TocIcon />}
          onClick={() => {
            handleGallery("table");
          }}
          sx={{ mt: 0.75, ml: 0.75 , width: 120, fontSize: 14}}
        >
          Table
        </Button>

        </Grid>
        <Grid item xs={4}>
          <TablePagination
            component="div"
            count={pagination.totalRows}
            page={pagination.currPage}
            onPageChange={(event, newPage)=>setPagination({...pagination, currPage: newPage})}
            rowsPerPage={pagination.rowsPerPage}
            onRowsPerPageChange={(event) => setPagination({...pagination, rowsPerPage: parseInt(event.target.value, 10)})}
            rowsPerPageOptions={[12, 24, 36, 48, 96]}
          />
        </Grid>
        </Grid>
      {/* </Stack> */}
      <Grid
        container
        spacing={{ xs: 6, md: 4, lg: 5 }}
        padding={{ xs: 4, md: 3, lg: 4 }}
        paddingTop={{ xs: 0, md: 0, lg: 0 }}
      >
        {gallery}
      </Grid>
    </div>
  );
}
